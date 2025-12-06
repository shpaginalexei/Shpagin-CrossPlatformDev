import { JWTPayload } from "jose";

import { User } from "@/types/api";

export interface AuthContextType {
  isAuth: boolean;
  session: TokenPayload | null;
  user: User | null;
}

export enum RoleType {
  ADMIN = "admin",
  USER = "user",
}

export interface TokenPayload extends JWTPayload {
  id: string;
  name: string;
  role: RoleType;
}
