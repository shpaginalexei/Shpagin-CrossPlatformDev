"use client";

import { createContext, ReactNode, use, useContext } from "react";

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
  if (!context) {
    throw new Error("Хук useAuth должен использоваться внутри AuthProvider");
  }
  return use(context);
};
