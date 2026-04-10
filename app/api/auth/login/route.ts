import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { z } from "zod";

import { attachSessionCookie } from "@/lib/auth/cookies";
import { signSessionToken } from "@/lib/auth/jwt";
import { findUserByEmail } from "@/lib/db";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = loginSchema.parse(await request.json());
    const user = await findUserByEmail(body.email.toLowerCase());

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(body.password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const token = await signSessionToken({
      sub: user.id,
      email: user.email,
      isPaid: user.isPaid
    });

    const response = NextResponse.json({
      success: true
    });

    return attachSessionCookie(response, token);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to log in." }, { status: 400 });
  }
}
