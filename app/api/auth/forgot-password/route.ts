import crypto from "node:crypto";

import { NextResponse } from "next/server";
import { z } from "zod";

import { sendPasswordResetEmail } from "@/lib/email/service";
import { prisma } from "@/lib/prisma/client";

const forgotPasswordSchema = z.object({
  email: z.string().email()
});

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = forgotPasswordSchema.parse(await request.json());
    const normalizedEmail = body.email.toLowerCase();
    const user = await prisma.user.findUnique({
      where: {
        email: normalizedEmail
      }
    });

    if (user) {
      const rawToken = crypto.randomBytes(32).toString("hex");
      const tokenHash = hashToken(rawToken);

      await prisma.passwordResetToken.deleteMany({
        where: {
          userId: user.id
        }
      });

      await prisma.passwordResetToken.create({
        data: {
          tokenHash,
          userId: user.id,
          expiresAt: new Date(Date.now() + 1000 * 60 * 30)
        }
      });

      await sendPasswordResetEmail(user.email, rawToken);
    }

    return NextResponse.json({
      message: "If that account exists, a reset link has been sent."
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to send reset email." },
      { status: 400 }
    );
  }
}
