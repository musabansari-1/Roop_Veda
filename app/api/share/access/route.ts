import { NextResponse } from "next/server";
import { z } from "zod";

import { getCurrentUser } from "@/lib/auth/current-user";
import { sendDashboardAccessEmail } from "@/lib/email/service";

const shareSchema = z.object({
  email: z.string().email()
});

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = shareSchema.parse(await request.json());
    await sendDashboardAccessEmail(body.email.toLowerCase(), user.email);

    return NextResponse.json({
      success: true
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to send access link." },
      { status: 400 }
    );
  }
}
