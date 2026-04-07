import { NextResponse } from "next/server";

import { isProduction } from "@/lib/env";
import {
  SESSION_COOKIE_NAME,
  SESSION_DURATION_SECONDS
} from "@/lib/auth/constants";

export function attachSessionCookie(response: NextResponse, token: string) {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction,
    path: "/",
    maxAge: SESSION_DURATION_SECONDS
  });

  return response;
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction,
    path: "/",
    maxAge: 0
  });

  return response;
}
