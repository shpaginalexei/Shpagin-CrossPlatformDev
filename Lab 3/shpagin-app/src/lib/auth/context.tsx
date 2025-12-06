"use client";

import { createContext, ReactNode, use, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

import { AuthContextType } from "./types";

export const AuthContext = createContext<Promise<AuthContextType> | null>(null);

export function AuthContextProvider({
  data,
  children,
}: {
  data: Promise<AuthContextType>;
  children: ReactNode;
}) {
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  const router = useRouter();
  if (!context) {
    throw new Error("Хук useAuth должен использоваться внутри AuthProvider");
  }

  const { session } = use(context);

  useEffect(() => {
    if (session && session.exp) {
      const now = Math.floor(Date.now() / 1000);
      if (now > session.exp) {
        console.warn("Token expiration date has expired");
        router.push("/login");
      }
    }
  }, [session, context, router]);

  return use(context);
};
