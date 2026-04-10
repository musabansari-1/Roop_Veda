import { randomUUID } from "node:crypto";

import { sql } from "@/lib/db/client";

export type UserRecord = {
  id: string;
  email: string;
  password: string;
  isPaid: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type LeadRecord = {
  id: string;
  email: string;
  quizAnswers: unknown;
  source: string;
  ipAddress: string | null;
  userAgent: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  fbclid: string | null;
  fbc: string | null;
  fbp: string | null;
  pageUrl: string | null;
  createdAt: Date;
};

export type VideoRecord = {
  id: string;
  title: string;
  description: string | null;
  gcsPath: string;
  durationSeconds: number | null;
  createdAt: Date;
  updatedAt: Date;
};

export type PurchaseRecord = {
  id: string;
  userId: string | null;
  leadId: string | null;
  email: string;
  stripeSessionId: string;
  status: string;
  planId: string;
  amount: number;
  currency: string;
  source: string | null;
  purchaseEventId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type PasswordResetTokenRecord = {
  id: string;
  tokenHash: string;
  expiresAt: Date;
  createdAt: Date;
  userId: string;
};

declare global {
  // eslint-disable-next-line no-var
  var __roopVedaSchemaReady: boolean | undefined;
  // eslint-disable-next-line no-var
  var __roopVedaSchemaPromise: Promise<void> | undefined;
}

async function initializeSchema() {
  await sql`
    create table if not exists "User" (
      "id" text primary key,
      "email" text not null unique,
      "password" text not null,
      "isPaid" boolean not null default false,
      "createdAt" timestamptz not null default now(),
      "updatedAt" timestamptz not null default now()
    )
  `;

  await sql`
    create table if not exists "Lead" (
      "id" text primary key,
      "email" text not null,
      "quizAnswers" jsonb not null,
      "source" text not null,
      "ipAddress" text,
      "userAgent" text,
      "utmSource" text,
      "utmMedium" text,
      "utmCampaign" text,
      "fbclid" text,
      "fbc" text,
      "fbp" text,
      "pageUrl" text,
      "createdAt" timestamptz not null default now()
    )
  `;

  await sql`
    create table if not exists "Video" (
      "id" text primary key,
      "title" text not null,
      "description" text,
      "gcsPath" text not null,
      "durationSeconds" integer,
      "createdAt" timestamptz not null default now(),
      "updatedAt" timestamptz not null default now()
    )
  `;

  await sql`
    create table if not exists "Purchase" (
      "id" text primary key,
      "userId" text references "User" ("id") on delete set null,
      "leadId" text references "Lead" ("id") on delete set null,
      "email" text not null,
      "stripeSessionId" text not null unique,
      "status" text not null,
      "planId" text not null,
      "amount" integer not null,
      "currency" text not null,
      "source" text,
      "purchaseEventId" text,
      "createdAt" timestamptz not null default now(),
      "updatedAt" timestamptz not null default now()
    )
  `;

  await sql`
    create table if not exists "PasswordResetToken" (
      "id" text primary key,
      "tokenHash" text not null unique,
      "expiresAt" timestamptz not null,
      "createdAt" timestamptz not null default now(),
      "userId" text not null references "User" ("id") on delete cascade
    )
  `;
}

export async function ensureDatabaseSchema() {
  if (global.__roopVedaSchemaReady) {
    return;
  }

  if (!global.__roopVedaSchemaPromise) {
    global.__roopVedaSchemaPromise = initializeSchema().then(() => {
      global.__roopVedaSchemaReady = true;
    });
  }

  await global.__roopVedaSchemaPromise;
}

export async function findUserByEmail(email: string) {
  await ensureDatabaseSchema();

  const [user] = await sql<UserRecord[]>`
    select "id", "email", "password", "isPaid", "createdAt", "updatedAt"
    from "User"
    where "email" = ${email}
    limit 1
  `;

  return user ?? null;
}

export async function findUserById(id: string) {
  await ensureDatabaseSchema();

  const [user] = await sql<UserRecord[]>`
    select "id", "email", "password", "isPaid", "createdAt", "updatedAt"
    from "User"
    where "id" = ${id}
    limit 1
  `;

  return user ?? null;
}

export async function createUser(input: {
  email: string;
  password: string;
  isPaid: boolean;
}) {
  await ensureDatabaseSchema();

  const [user] = await sql<UserRecord[]>`
    insert into "User" ("id", "email", "password", "isPaid")
    values (${randomUUID()}, ${input.email}, ${input.password}, ${input.isPaid})
    returning "id", "email", "password", "isPaid", "createdAt", "updatedAt"
  `;

  return user;
}

export async function updateUser(input: {
  id: string;
  password?: string;
  isPaid?: boolean;
}) {
  await ensureDatabaseSchema();

  const [user] = await sql<UserRecord[]>`
    update "User"
    set
      "password" = coalesce(${input.password ?? null}, "password"),
      "isPaid" = coalesce(${input.isPaid ?? null}, "isPaid"),
      "updatedAt" = now()
    where "id" = ${input.id}
    returning "id", "email", "password", "isPaid", "createdAt", "updatedAt"
  `;

  return user ?? null;
}

export async function createLead(input: {
  email: string;
  quizAnswers: Record<string, string>;
  source: string;
  ipAddress: string | null;
  userAgent: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  fbclid: string | null;
  fbc: string | null;
  fbp: string | null;
  pageUrl: string | null;
}) {
  await ensureDatabaseSchema();

  const [lead] = await sql<LeadRecord[]>`
    insert into "Lead" (
      "id",
      "email",
      "quizAnswers",
      "source",
      "ipAddress",
      "userAgent",
      "utmSource",
      "utmMedium",
      "utmCampaign",
      "fbclid",
      "fbc",
      "fbp",
      "pageUrl"
    )
    values (
      ${randomUUID()},
      ${input.email},
      ${sql.json(input.quizAnswers)},
      ${input.source},
      ${input.ipAddress},
      ${input.userAgent},
      ${input.utmSource},
      ${input.utmMedium},
      ${input.utmCampaign},
      ${input.fbclid},
      ${input.fbc},
      ${input.fbp},
      ${input.pageUrl}
    )
    returning
      "id",
      "email",
      "quizAnswers",
      "source",
      "ipAddress",
      "userAgent",
      "utmSource",
      "utmMedium",
      "utmCampaign",
      "fbclid",
      "fbc",
      "fbp",
      "pageUrl",
      "createdAt"
  `;

  return lead;
}

export async function findLeadById(id: string) {
  await ensureDatabaseSchema();

  const [lead] = await sql<LeadRecord[]>`
    select
      "id",
      "email",
      "quizAnswers",
      "source",
      "ipAddress",
      "userAgent",
      "utmSource",
      "utmMedium",
      "utmCampaign",
      "fbclid",
      "fbc",
      "fbp",
      "pageUrl",
      "createdAt"
    from "Lead"
    where "id" = ${id}
    limit 1
  `;

  return lead ?? null;
}

export async function upsertPurchaseBySessionId(input: {
  userId?: string;
  leadId?: string;
  email: string;
  stripeSessionId: string;
  status: string;
  planId: string;
  amount: number;
  currency: string;
  source?: string;
  purchaseEventId?: string;
}) {
  await ensureDatabaseSchema();

  const [purchase] = await sql<PurchaseRecord[]>`
    insert into "Purchase" (
      "id",
      "userId",
      "leadId",
      "email",
      "stripeSessionId",
      "status",
      "planId",
      "amount",
      "currency",
      "source",
      "purchaseEventId"
    )
    values (
      ${randomUUID()},
      ${input.userId ?? null},
      ${input.leadId ?? null},
      ${input.email},
      ${input.stripeSessionId},
      ${input.status},
      ${input.planId},
      ${input.amount},
      ${input.currency},
      ${input.source ?? null},
      ${input.purchaseEventId ?? null}
    )
    on conflict ("stripeSessionId") do update
    set
      "userId" = coalesce(excluded."userId", "Purchase"."userId"),
      "leadId" = coalesce(excluded."leadId", "Purchase"."leadId"),
      "email" = excluded."email",
      "status" = excluded."status",
      "planId" = excluded."planId",
      "amount" = excluded."amount",
      "currency" = excluded."currency",
      "source" = coalesce(excluded."source", "Purchase"."source"),
      "purchaseEventId" = coalesce(excluded."purchaseEventId", "Purchase"."purchaseEventId"),
      "updatedAt" = now()
    returning
      "id",
      "userId",
      "leadId",
      "email",
      "stripeSessionId",
      "status",
      "planId",
      "amount",
      "currency",
      "source",
      "purchaseEventId",
      "createdAt",
      "updatedAt"
  `;

  return purchase;
}

export async function findPurchaseBySessionId(stripeSessionId: string) {
  await ensureDatabaseSchema();

  const [purchase] = await sql<PurchaseRecord[]>`
    select
      "id",
      "userId",
      "leadId",
      "email",
      "stripeSessionId",
      "status",
      "planId",
      "amount",
      "currency",
      "source",
      "purchaseEventId",
      "createdAt",
      "updatedAt"
    from "Purchase"
    where "stripeSessionId" = ${stripeSessionId}
    limit 1
  `;

  return purchase ?? null;
}

export async function replacePasswordResetToken(input: {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
}) {
  await ensureDatabaseSchema();

  await sql`
    delete from "PasswordResetToken"
    where "userId" = ${input.userId}
  `;

  const [token] = await sql<PasswordResetTokenRecord[]>`
    insert into "PasswordResetToken" ("id", "tokenHash", "expiresAt", "userId")
    values (${randomUUID()}, ${input.tokenHash}, ${input.expiresAt}, ${input.userId})
    returning "id", "tokenHash", "expiresAt", "createdAt", "userId"
  `;

  return token;
}

export async function findPasswordResetTokenByHash(tokenHash: string) {
  await ensureDatabaseSchema();

  const [token] = await sql<PasswordResetTokenRecord[]>`
    select "id", "tokenHash", "expiresAt", "createdAt", "userId"
    from "PasswordResetToken"
    where "tokenHash" = ${tokenHash}
    limit 1
  `;

  return token ?? null;
}

export async function deletePasswordResetTokensByUserId(userId: string) {
  await ensureDatabaseSchema();

  await sql`
    delete from "PasswordResetToken"
    where "userId" = ${userId}
  `;
}

export async function findVideoById(id: string) {
  await ensureDatabaseSchema();

  const [video] = await sql<VideoRecord[]>`
    select
      "id",
      "title",
      "description",
      "gcsPath",
      "durationSeconds",
      "createdAt",
      "updatedAt"
    from "Video"
    where "id" = ${id}
    limit 1
  `;

  return video ?? null;
}

export async function listVideos(limit = 30) {
  await ensureDatabaseSchema();

  return sql<VideoRecord[]>`
    select
      "id",
      "title",
      "description",
      "gcsPath",
      "durationSeconds",
      "createdAt",
      "updatedAt"
    from "Video"
    order by "createdAt" desc
    limit ${limit}
  `;
}
