import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { z } from "zod";

import { attachSessionCookie } from "@/lib/auth/cookies";
import { signSessionToken } from "@/lib/auth/jwt";
import { sendAccountCreatedEmail } from "@/lib/email/service";
import {
  canUseTemporaryManualAccess,
  isBypassCheckoutEnabled
} from "@/lib/env";
import {
  createUser,
  findPurchaseBySessionId,
  findUserByEmail,
  updateUser,
  upsertPurchaseBySessionId
} from "@/lib/db";
import { getStripeServer, hasStripe } from "@/lib/stripe/server";

const accountSetupSchema = z
  .object({
    sessionId: z.string().min(1),
    email: z.string().email().optional(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8)
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"]
  });

export const runtime = "nodejs";

function logAccountEmailFailure(email: string, error: unknown) {
  console.error("[account-setup] Account email failed", {
    email,
    error
  });
}

export async function POST(request: Request) {
  try {
    const body = accountSetupSchema.parse(await request.json());
    let sessionEmail: string | undefined;
    let sessionId = body.sessionId;
    let planId = "signature-ritual";
    let amount = 0;
    let currency = "usd";
    let source = "seo";
    let purchaseEventId: string | undefined;
    let leadId: string | undefined;

    if (hasStripe()) {
      const stripe = getStripeServer();
      const session = await stripe.checkout.sessions.retrieve(body.sessionId);

      if (session.payment_status !== "paid") {
        return NextResponse.json(
          { error: "Payment has not been completed yet." },
          { status: 400 }
        );
      }

      sessionEmail = (
        session.customer_details?.email ??
        session.customer_email ??
        body.email
      )?.toLowerCase();
      sessionId = session.id;
      planId = session.metadata?.planId ?? "signature-ritual";
      amount = Number(session.amount_total ?? 0);
      currency = (session.currency ?? "usd").toLowerCase();
      source = session.metadata?.source ?? "seo";
      purchaseEventId = session.metadata?.purchaseEventId;
      leadId = session.metadata?.leadId ?? undefined;
    } else {
      const purchase = await findPurchaseBySessionId(body.sessionId);

      if (!purchase || purchase.status !== "paid") {
        return NextResponse.json(
          { error: "Payment has not been completed yet." },
          { status: 400 }
        );
      }

      if (
        !isBypassCheckoutEnabled &&
        !canUseTemporaryManualAccess(purchase.email)
      ) {
        return NextResponse.json(
          { error: "Temporary manual access is not approved for this email." },
          { status: 403 }
        );
      }

      sessionEmail = (purchase.email ?? body.email)?.toLowerCase();
      planId = purchase.planId;
      amount = purchase.amount;
      currency = purchase.currency;
      source = purchase.source ?? "seo";
      purchaseEventId = purchase.purchaseEventId ?? undefined;
      leadId = purchase.leadId ?? undefined;
    }

    if (!sessionEmail) {
      return NextResponse.json(
        { error: "Missing email for this purchase." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 12);
    const existingUser = await findUserByEmail(sessionEmail);

    const user = existingUser
      ? await updateUser({
          id: existingUser.id,
          password: hashedPassword,
          isPaid: true
        })
      : await createUser({
          email: sessionEmail,
          password: hashedPassword,
          isPaid: true
        });

    if (!user) {
      throw new Error("Unable to persist user.");
    }

    await upsertPurchaseBySessionId({
      userId: user.id,
      leadId,
      email: sessionEmail,
      stripeSessionId: sessionId,
      status: "paid",
      planId,
      amount,
      currency,
      source,
      purchaseEventId
    });

    const accountEmailResult = await sendAccountCreatedEmail(user.email).then(
      () => ({ ok: true as const }),
      (error) => ({ ok: false as const, error })
    );

    if (!accountEmailResult.ok) {
      logAccountEmailFailure(user.email, accountEmailResult.error);
    }

    const token = await signSessionToken({
      sub: user.id,
      email: user.email,
      isPaid: true
    });

    const response = NextResponse.json({
      success: true
    });

    return attachSessionCookie(response, token);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to complete account setup." },
      { status: 400 }
    );
  }
}
