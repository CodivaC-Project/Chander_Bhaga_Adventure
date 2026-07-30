"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { authClient } from "@/lib/auth-client";

interface SessionContextType {
  session: any;
  isPending: boolean;
  isAuthenticated: boolean;
  user: any;
}

const SessionContext = createContext<SessionContextType>({
  session: null,
  isPending: true,
  isAuthenticated: false,
  user: null,
});

export function useSessionContext() {
  return useContext(SessionContext);
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending } = authClient.useSession();

  return (
    <SessionContext.Provider
      value={{
        session,
        isPending,
        isAuthenticated: !!session,
        user: session?.user || null,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
