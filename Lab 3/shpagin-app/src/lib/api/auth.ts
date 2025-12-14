import { LoginFormSchema } from "@/lib/schemas/login";
import { RegistrationFormSchema } from "@/lib/schemas/registration";
import { User } from "@/types/api";

import { apiClient } from "./client";

export type RegisterRequest = Omit<RegistrationFormSchema, "confirmPassword">;

type RegisterResponse = User;

export type LoginRequest = Omit<LoginFormSchema, "rememberMe">;

export interface LoginResponse {
  access_token: string;
}

export const authApi = {
  register: (data: RegisterRequest) =>
    apiClient.post<RegisterResponse>({
      endpoint: `/auth/register`,
      data: data,
      isAuthorized: false,
    }),

  login: (data: LoginRequest) =>
    apiClient.post<LoginResponse>({
      endpoint: `/auth/login`,
      data: data,
      isAuthorized: false,
    }),
};
