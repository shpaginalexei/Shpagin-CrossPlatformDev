import "server-only";

import { cache } from "react";

import { usersApi } from "@/lib/api/user";

import { decodeToken } from "./decode";
import { getAccessToken } from "./session";
import { AuthContextType } from "./types";

export const getUser = cache(async (): Promise<AuthContextType> => {
  const token = await getAccessToken();
  const session = decodeToken(token);

  if (!session)
    return { isAuth: false, session, user: null } as AuthContextType;

  try {
    const user = await usersApi.findOne(session.id);
    return { isAuth: true, session, user } as AuthContextType;
  } catch (e) {
    console.warn("[Get User Error]:", e);
    return { isAuth: false, session, user: null } as AuthContextType;
  }
});
