import crypto from "node:crypto";

import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { z } from "zod";

import {
  deletePasswordResetTokensByUserId,
  findPasswordResetTokenByHash,
  updateUser
} from "@/lib/db";

const resetPasswordSchema = z
  .object({
    token: z.string().min(1),
    password: z.string().min(8),
    confirmPassword: z.string().min(8)
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"]
  });

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = resetPasswordSchema.parse(await request.json());
    const tokenHash = hashToken(body.token);

    const resetToken = await findPasswordResetTokenByHash(tokenHash);

    if (!resetToken || resetToken.expiresAt < new Date()) {
      return NextResponse.json(
        { error: "This reset link is invalid or expired." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 12);

    await updateUser({
      id: resetToken.userId,
      password: hashedPassword
    });

    await deletePasswordResetTokensByUserId(resetToken.userId);

    return NextResponse.json({
      success: true
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to reset password." },
      { status: 400 }
    );
  }
}
