import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "usd") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase()
  }).format(amount / 100);
}

export function getBaseUrl(request?: Request) {
  if (request) {
    const forwardedHost = request.headers.get("x-forwarded-host");
    const forwardedProto = request.headers.get("x-forwarded-proto");
    const host = forwardedHost ?? request.headers.get("host");

    if (host) {
      const protocol =
        forwardedProto ??
        (host.includes("localhost") || host.startsWith("127.0.0.1")
          ? "http"
          : "https");

      return `${protocol}://${host}`;
    }
  }

  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

export function absoluteUrl(pathname: string, request?: Request) {
  return new URL(pathname, getBaseUrl(request)).toString();
}
