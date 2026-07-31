import { NextRequest } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL_NON_POOLING || process.env.DATABASE_URL,
  // Supabase poolers need rejectUnauthorized: false for their cert chain
  ssl: { rejectUnauthorized: false },
});

export interface AdminUser {
  userId: string;
  role: string;
}

export async function verifyAdminAuth(request: NextRequest): Promise<{ user: AdminUser } | { error: string; status: number }> {
  const sessionCookie =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");

  if (!sessionCookie) {
    return { error: "Unauthorized", status: 401 };
  }

  try {
    // Better Auth cookie format: {token}.{signature}
    // The session table stores just the token portion
    const token = sessionCookie.value.split(".")[0];
    const sessionResult = await pool.query(
      'SELECT s."userId", u.role FROM session s JOIN "user" u ON s."userId" = u.id WHERE s.token = $1',
      [token]
    );

    if (sessionResult.rows.length === 0 || sessionResult.rows[0].role !== "admin") {
      return { error: "Forbidden", status: 403 };
    }

    return { user: sessionResult.rows[0] };
  } catch {
    return { error: "Auth check failed", status: 500 };
  }
}
