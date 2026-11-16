import { Pool } from "pg";

export function createPool(): Pool {
  const connectionString =
    process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "Missing database connection string: set POSTGRES_URL_NON_POOLING or DATABASE_URL."
    );
  }

  const url = new URL(connectionString);
  const hadSslMode = url.searchParams.has("sslmode");
  url.searchParams.delete("sslmode");

  return new Pool({
    connectionString: url.toString(),
    ...(hadSslMode || process.env.NODE_TLS_REJECT_UNAUTHORIZED === "0"
      ? { ssl: { rejectUnauthorized: false } }
      : {}),
  });
}
