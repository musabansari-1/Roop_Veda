import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";

import "@/app/globals.css";

import { SiteBootstrap } from "@/components/providers/site-bootstrap";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Roop Veda | Quiz Funnel and Private Video Dashboard",
  description:
    "A quiz-first transformation funnel with secure checkout, email automation, and a private subscription video dashboard."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        <SiteBootstrap />
        {children}
      </body>
    </html>
  );
}
