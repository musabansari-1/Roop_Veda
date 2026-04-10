import postgres from "postgres";

import { env } from "@/lib/env";

declare global {
  // eslint-disable-next-line no-var
  var __roopVedaSqlClient: ReturnType<typeof postgres> | undefined;
}

function createClient() {
  return postgres(env.DATABASE_URL, {
    max: 10,
    idle_timeout: 20,
    connect_timeout: 15,
    prepare: false
  });
}

export const sql = global.__roopVedaSqlClient ?? createClient();

if (process.env.NODE_ENV !== "production") {
  global.__roopVedaSqlClient = sql;
}
