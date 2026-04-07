import { SignJWT, jwtVerify } from "jose";

import { env } from "@/lib/env";

export type SessionTokenPayload = {
  sub: string;
  email: string;
  isPaid: boolean;
};

const secretKey = new TextEncoder().encode(env.AUTH_JWT_SECRET);

export async function signSessionToken(payload: SessionTokenPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
}

export async function verifySessionToken(token: string) {
  const { payload } = await jwtVerify(token, secretKey);
  return payload as SessionTokenPayload;
}
