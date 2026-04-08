import { NextResponse } from "next/server";
import { z } from "zod";

import { env, isProduction } from "@/lib/env";
import { sendTestEmail } from "@/lib/email/service";

const testEmailSchema = z.object({
  email: z.string().email()
});

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (isProduction) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  try {
    const body = testEmailSchema.parse(await request.json());
    const result = await sendTestEmail(body.email.toLowerCase());

    return NextResponse.json({
      success: true,
      from: env.RESEND_FROM_EMAIL,
      result
    });
  } catch (error) {
    console.error("[email] Test email route failed", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to send test email."
      },
      { status: 400 }
    );
  }
}
