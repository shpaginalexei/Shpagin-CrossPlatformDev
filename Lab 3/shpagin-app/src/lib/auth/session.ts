import "server-only";

import { cookies } from "next/headers";

import { decodeToken } from "./decode";

interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "lax" | "strict" | "none";
  path?: string;
  expires?: Date;
}

export async function getAccessToken(): Promise<string | null> {
  return (await cookies()).get("access_token")?.value || null;
}

export async function setAccessToken(token: string, rememberMe: boolean) {
  const payload = decodeToken(token);
  const cookieOptions: CookieOptions = {
    secure: false,
    sameSite: "lax",
    path: "/",
  };

  if (rememberMe && payload?.exp) {
    cookieOptions.expires = new Date(payload.exp * 1000);
  }

  (await cookies()).set("access_token", token, cookieOptions);
}

export async function deleteAccessToken() {
  (await cookies()).delete("access_token");
}
