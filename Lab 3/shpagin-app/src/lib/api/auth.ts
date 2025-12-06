import { apiClient } from "@/lib/api/client";
import { LoginFormSchema } from "@/lib/schemas/login";
import { RegistrationFormSchema } from "@/lib/schemas/registration";
import { User } from "@/types/api";

export type RegisterRequest = Omit<RegistrationFormSchema, "confirmPassword">;

type RegisterResponse = User;

export type LoginRequest = Omit<LoginFormSchema, "rememberMe">;

export interface LoginResponse {
  access_token: string;
}

export const authApi = {
  register: (data: RegisterRequest) =>
    apiClient.post<RegisterResponse>("/auth/register", data, {}, false),

  login: (data: LoginRequest) =>
    apiClient.post<LoginResponse>("/auth/login", data, {}, false),
};
