import { Resend } from "resend";

import { env } from "@/lib/env";
import { absoluteUrl } from "@/lib/utils";

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

async function deliverEmail(payload: EmailPayload) {
  if (!resend) {
    console.warn(`Resend disabled; skipped email: ${payload.subject}`);
    return { skipped: true };
  }

  return resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to: payload.to,
    subject: payload.subject,
    html: payload.html
  });
}

function wrapEmail(body: string, title: string) {
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;background:#f8f5ef;padding:32px;color:#19332d;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:20px;padding:32px;border:1px solid #efe4d7;">
        <p style="letter-spacing:0.12em;text-transform:uppercase;font-size:12px;color:#e86a33;margin:0 0 12px;">Roop Veda</p>
        <h1 style="font-size:28px;line-height:1.2;margin:0 0 20px;">${title}</h1>
        ${body}
      </div>
    </div>
  `;
}

export async function sendLeadContinueEmail(email: string, leadId: string) {
  const plansUrl = absoluteUrl(`/plans?leadId=${leadId}`);

  return deliverEmail({
    to: email,
    subject: "Continue your Roop Veda plan selection",
    html: wrapEmail(
      `
        <p style="font-size:16px;line-height:1.6;">Your personalized recommendation is ready. Pick up where you left off and choose the plan that matches your goals.</p>
        <p style="margin:24px 0;">
          <a href="${plansUrl}" style="display:inline-block;background:#19332d;color:#ffffff;padding:14px 22px;border-radius:999px;text-decoration:none;">Continue your purchase</a>
        </p>
      `,
      "Your quiz results are waiting"
    )
  });
}

export async function sendPaymentConfirmationEmail(
  email: string,
  planName: string
) {
  const setupUrl = absoluteUrl("/login");

  return deliverEmail({
    to: email,
    subject: "Payment confirmed for your Roop Veda access",
    html: wrapEmail(
      `
        <p style="font-size:16px;line-height:1.6;">Payment for <strong>${planName}</strong> has been confirmed. Complete your password setup to unlock your dashboard.</p>
        <p style="margin:24px 0;">
          <a href="${setupUrl}" style="display:inline-block;background:#e86a33;color:#ffffff;padding:14px 22px;border-radius:999px;text-decoration:none;">Open Roop Veda</a>
        </p>
      `,
      "Your payment is confirmed"
    )
  });
}

export async function sendAccountCreatedEmail(email: string) {
  const dashboardUrl = absoluteUrl("/dashboard");

  return deliverEmail({
    to: email,
    subject: "Your Roop Veda dashboard is ready",
    html: wrapEmail(
      `
        <p style="font-size:16px;line-height:1.6;">Your account is live and your video library is unlocked.</p>
        <p style="margin:24px 0;">
          <a href="${dashboardUrl}" style="display:inline-block;background:#19332d;color:#ffffff;padding:14px 22px;border-radius:999px;text-decoration:none;">Go to dashboard</a>
        </p>
      `,
      "Welcome to Roop Veda"
    )
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = absoluteUrl(`/reset-password?token=${token}`);

  return deliverEmail({
    to: email,
    subject: "Reset your Roop Veda password",
    html: wrapEmail(
      `
        <p style="font-size:16px;line-height:1.6;">Use the link below to set a new password. This link expires in 30 minutes.</p>
        <p style="margin:24px 0;">
          <a href="${resetUrl}" style="display:inline-block;background:#19332d;color:#ffffff;padding:14px 22px;border-radius:999px;text-decoration:none;">Reset password</a>
        </p>
      `,
      "Password reset request"
    )
  });
}

export async function sendDashboardAccessEmail(
  email: string,
  senderEmail: string
) {
  const loginUrl = absoluteUrl("/login");

  return deliverEmail({
    to: email,
    subject: `${senderEmail} shared the Roop Veda login link`,
    html: wrapEmail(
      `
        <p style="font-size:16px;line-height:1.6;">Use the secure login link below to access Roop Veda from another device.</p>
        <p style="margin:24px 0;">
          <a href="${loginUrl}" style="display:inline-block;background:#e86a33;color:#ffffff;padding:14px 22px;border-radius:999px;text-decoration:none;">Open login</a>
        </p>
      `,
      "Your dashboard access link"
    )
  });
}
