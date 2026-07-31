import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { sendVerificationEmail, sendPasswordResetEmail } from "./email";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const auth = betterAuth({
  database: pool,
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    sendResetPassword: async ({ user, url, token }) => {
      await sendPasswordResetEmail({
        email: user.email,
        name: user.name || "User",
        url,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: false,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }) => {
      await sendVerificationEmail({
        email: user.email,
        name: user.name || "User",
        url,
      });
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: false,
      },
      phone: {
        type: "string",
        required: false,
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
});
