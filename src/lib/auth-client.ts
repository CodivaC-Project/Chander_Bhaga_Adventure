"use client";

import { createAuthClient } from "better-auth/react";

// Always call the auth API on the same origin the browser is currently on.
// This prevents production sites from falling back to the localhost default
// when NEXT_PUBLIC_APP_URL isn't set at build time.
const baseURL =
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const authClient = createAuthClient({
  baseURL,
});

export const { signIn, signUp, useSession, signOut } = authClient;
