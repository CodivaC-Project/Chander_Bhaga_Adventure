import { Pool } from "pg";

/**
 * Shared Postgres pool for Better Auth and admin auth.
 *
 * Supabase pooler URLs carry `?sslmode=require`, which makes node-postgres
 * ignore the client `ssl` option and enforce strict certificate verification
 * against Supabase's self-signed pooler chain — breaking every query in
 * production (500s on /api/auth/*) unless NODE_TLS_REJECT_UNAUTHORIZED=0 is
 * set. Rewriting sslmode to `no-verify` (instead of stripping it) keeps the
 * query string valid in every position, and the `ssl` option below confirms
 * the same intent.
 */
export function createPool(): Pool {
  const raw =
    process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL;

  if (!raw) {
    throw new Error(
      "Missing database connection string: set POSTGRES_URL_NON_POOLING or DATABASE_URL."
    );
  }

  const connectionString = raw.replace(/sslmode=[a-z-]+/i, "sslmode=no-verify");

  return new Pool({
    connectionString,
    // Supabase poolers need rejectUnauthorized: false for their cert chain
    ssl: { rejectUnauthorized: false },
  });
}
