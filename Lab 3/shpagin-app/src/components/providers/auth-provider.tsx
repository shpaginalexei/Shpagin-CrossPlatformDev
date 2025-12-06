import { ReactNode } from "react";

import { AuthContextProvider } from "@/lib/auth/context";
import { getUser } from "@/lib/auth/dal";

export async function AuthProvider({ children }: { children: ReactNode }) {
  const userPromise = getUser();

  return (
    <AuthContextProvider data={userPromise}>{children}</AuthContextProvider>
  );
}
