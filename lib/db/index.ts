import { randomUUID } from "node:crypto";

import { sql } from "@/lib/db/client";
import { isProduction } from "@/lib/env";

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
  // eslint-disable-next-line no-var
  var __roopVedaDbAvailable: boolean | undefined;
  // eslint-disable-next-line no-var
  var __roopVedaDbFallbackWarned: boolean | undefined;
  // eslint-disable-next-line no-var
  var __roopVedaMemoryDb:
    | {
        users: Map<string, UserRecord>;
        usersByEmail: Map<string, string>;
        leads: Map<string, LeadRecord>;
        purchases: Map<string, PurchaseRecord>;
        purchasesBySessionId: Map<string, string>;
        passwordResetTokens: Map<string, PasswordResetTokenRecord>;
        passwordResetTokensByHash: Map<string, string>;
        videos: Map<string, VideoRecord>;
      }
    | undefined;
}

function getMemoryDb() {
  if (!global.__roopVedaMemoryDb) {
    global.__roopVedaMemoryDb = {
      users: new Map(),
      usersByEmail: new Map(),
      leads: new Map(),
      purchases: new Map(),
      purchasesBySessionId: new Map(),
      passwordResetTokens: new Map(),
      passwordResetTokensByHash: new Map(),
      videos: new Map()
    };
  }

  return global.__roopVedaMemoryDb;
}

function isDatabaseConnectionError(error: unknown) {
  if (!(error instanceof Error)) {
    return false;
  }

  const postgresError = error as Error & { code?: string; errno?: number };
  const message = error.message.toLowerCase();

  return (
    postgresError.code === "ECONNREFUSED" ||
    postgresError.code === "ENOTFOUND" ||
    postgresError.code === "EAI_AGAIN" ||
    postgresError.code === "ETIMEDOUT" ||
    postgresError.errno === -4078 ||
    message.includes("connect econnrefused") ||
    message.includes("connection terminated") ||
    message.includes("timeout")
  );
}

function logDatabaseFallback(error: unknown) {
  if (global.__roopVedaDbFallbackWarned || isProduction) {
    return;
  }

  global.__roopVedaDbFallbackWarned = true;
  console.warn(
    "[db] Falling back to in-memory storage because the configured database is unavailable.",
    error
  );
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

  await sql`
    alter table "User"
    alter column "createdAt" set default now(),
    alter column "updatedAt" set default now()
  `;

  await sql`
    alter table "Lead"
    alter column "createdAt" set default now()
  `;

  await sql`
    alter table "Video"
    alter column "createdAt" set default now(),
    alter column "updatedAt" set default now()
  `;

  await sql`
    alter table "Purchase"
    alter column "createdAt" set default now(),
    alter column "updatedAt" set default now()
  `;

  await sql`
    alter table "PasswordResetToken"
    alter column "createdAt" set default now()
  `;
}

export async function ensureDatabaseSchema() {
  if (global.__roopVedaDbAvailable === false) {
    return;
  }

  if (global.__roopVedaSchemaReady) {
    global.__roopVedaDbAvailable = true;
    return;
  }

  if (!global.__roopVedaSchemaPromise) {
    global.__roopVedaSchemaPromise = initializeSchema()
      .then(() => {
        global.__roopVedaSchemaReady = true;
        global.__roopVedaDbAvailable = true;
      })
      .catch((error) => {
        if (isDatabaseConnectionError(error) && !isProduction) {
          global.__roopVedaDbAvailable = false;
          logDatabaseFallback(error);
          return;
        }

        throw error;
      });
  }

  await global.__roopVedaSchemaPromise;
}

export async function findUserByEmail(email: string) {
  await ensureDatabaseSchema();

  if (global.__roopVedaDbAvailable === false) {
    const memoryDb = getMemoryDb();
    const userId = memoryDb.usersByEmail.get(email);
    return userId ? memoryDb.users.get(userId) ?? null : null;
  }

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

  if (global.__roopVedaDbAvailable === false) {
    return getMemoryDb().users.get(id) ?? null;
  }

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

  if (global.__roopVedaDbAvailable === false) {
    const memoryDb = getMemoryDb();
    const now = new Date();
    const user: UserRecord = {
      id: randomUUID(),
      email: input.email,
      password: input.password,
      isPaid: input.isPaid,
      createdAt: now,
      updatedAt: now
    };

    memoryDb.users.set(user.id, user);
    memoryDb.usersByEmail.set(user.email, user.id);

    return user;
  }

  const now = new Date();

  const [user] = await sql<UserRecord[]>`
    insert into "User" ("id", "email", "password", "isPaid", "createdAt", "updatedAt")
    values (${randomUUID()}, ${input.email}, ${input.password}, ${input.isPaid}, ${now}, ${now})
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

  if (global.__roopVedaDbAvailable === false) {
    const memoryDb = getMemoryDb();
    const existingUser = memoryDb.users.get(input.id);

    if (!existingUser) {
      return null;
    }

    const user: UserRecord = {
      ...existingUser,
      password: input.password ?? existingUser.password,
      isPaid: input.isPaid ?? existingUser.isPaid,
      updatedAt: new Date()
    };

    memoryDb.users.set(user.id, user);
    memoryDb.usersByEmail.set(user.email, user.id);

    return user;
  }

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

  if (global.__roopVedaDbAvailable === false) {
    const memoryDb = getMemoryDb();
    const lead: LeadRecord = {
      id: randomUUID(),
      email: input.email,
      quizAnswers: input.quizAnswers,
      source: input.source,
      ipAddress: input.ipAddress,
      userAgent: input.userAgent,
      utmSource: input.utmSource,
      utmMedium: input.utmMedium,
      utmCampaign: input.utmCampaign,
      fbclid: input.fbclid,
      fbc: input.fbc,
      fbp: input.fbp,
      pageUrl: input.pageUrl,
      createdAt: new Date()
    };

    memoryDb.leads.set(lead.id, lead);
    return lead;
  }

  const now = new Date();

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
      "pageUrl",
      "createdAt"
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
      ${input.pageUrl},
      ${now}
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

  if (global.__roopVedaDbAvailable === false) {
    return getMemoryDb().leads.get(id) ?? null;
  }

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

  if (global.__roopVedaDbAvailable === false) {
    const memoryDb = getMemoryDb();
    const existingId = memoryDb.purchasesBySessionId.get(input.stripeSessionId);
    const existingPurchase = existingId
      ? memoryDb.purchases.get(existingId) ?? null
      : null;
    const now = new Date();

    const purchase: PurchaseRecord = existingPurchase
      ? {
          ...existingPurchase,
          userId: input.userId ?? existingPurchase.userId,
          leadId: input.leadId ?? existingPurchase.leadId,
          email: input.email,
          stripeSessionId: input.stripeSessionId,
          status: input.status,
          planId: input.planId,
          amount: input.amount,
          currency: input.currency,
          source: input.source ?? existingPurchase.source,
          purchaseEventId:
            input.purchaseEventId ?? existingPurchase.purchaseEventId,
          updatedAt: now
        }
      : {
          id: randomUUID(),
          userId: input.userId ?? null,
          leadId: input.leadId ?? null,
          email: input.email,
          stripeSessionId: input.stripeSessionId,
          status: input.status,
          planId: input.planId,
          amount: input.amount,
          currency: input.currency,
          source: input.source ?? null,
          purchaseEventId: input.purchaseEventId ?? null,
          createdAt: now,
          updatedAt: now
        };

    memoryDb.purchases.set(purchase.id, purchase);
    memoryDb.purchasesBySessionId.set(purchase.stripeSessionId, purchase.id);

    return purchase;
  }

  const now = new Date();

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
      "purchaseEventId",
      "createdAt",
      "updatedAt"
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
      ${input.purchaseEventId ?? null},
      ${now},
      ${now}
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

  if (global.__roopVedaDbAvailable === false) {
    const memoryDb = getMemoryDb();
    const purchaseId = memoryDb.purchasesBySessionId.get(stripeSessionId);
    return purchaseId ? memoryDb.purchases.get(purchaseId) ?? null : null;
  }

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

  if (global.__roopVedaDbAvailable === false) {
    const memoryDb = getMemoryDb();
    const now = new Date();

    for (const token of memoryDb.passwordResetTokens.values()) {
      if (token.userId === input.userId) {
        memoryDb.passwordResetTokens.delete(token.id);
        memoryDb.passwordResetTokensByHash.delete(token.tokenHash);
      }
    }

    const token: PasswordResetTokenRecord = {
      id: randomUUID(),
      tokenHash: input.tokenHash,
      expiresAt: input.expiresAt,
      createdAt: now,
      userId: input.userId
    };

    memoryDb.passwordResetTokens.set(token.id, token);
    memoryDb.passwordResetTokensByHash.set(token.tokenHash, token.id);

    return token;
  }

  const now = new Date();

  await sql`
    delete from "PasswordResetToken"
    where "userId" = ${input.userId}
  `;

  const [token] = await sql<PasswordResetTokenRecord[]>`
    insert into "PasswordResetToken" ("id", "tokenHash", "expiresAt", "userId", "createdAt")
    values (${randomUUID()}, ${input.tokenHash}, ${input.expiresAt}, ${input.userId}, ${now})
    returning "id", "tokenHash", "expiresAt", "createdAt", "userId"
  `;

  return token;
}

export async function findPasswordResetTokenByHash(tokenHash: string) {
  await ensureDatabaseSchema();

  if (global.__roopVedaDbAvailable === false) {
    const memoryDb = getMemoryDb();
    const tokenId = memoryDb.passwordResetTokensByHash.get(tokenHash);
    return tokenId ? memoryDb.passwordResetTokens.get(tokenId) ?? null : null;
  }

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

  if (global.__roopVedaDbAvailable === false) {
    const memoryDb = getMemoryDb();

    for (const token of memoryDb.passwordResetTokens.values()) {
      if (token.userId === userId) {
        memoryDb.passwordResetTokens.delete(token.id);
        memoryDb.passwordResetTokensByHash.delete(token.tokenHash);
      }
    }

    return;
  }

  await sql`
    delete from "PasswordResetToken"
    where "userId" = ${userId}
  `;
}

export async function findVideoById(id: string) {
  await ensureDatabaseSchema();

  if (global.__roopVedaDbAvailable === false) {
    return getMemoryDb().videos.get(id) ?? null;
  }

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

  if (global.__roopVedaDbAvailable === false) {
    return Array.from(getMemoryDb().videos.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

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
