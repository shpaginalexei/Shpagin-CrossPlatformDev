import "server-only";

import { decodeJwt } from "jose";

import { TokenPayload } from "./types";

export function decodeToken(token: string | null): TokenPayload | null {
  if (!token) return null;
  try {
    return decodeJwt(token) as TokenPayload;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}
