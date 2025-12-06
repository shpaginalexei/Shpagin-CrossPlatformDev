"use server";

import { redirect } from "next/navigation";

import { authApi, LoginRequest, RegisterRequest } from "@/lib/api/auth";
import { deleteAccessToken, setAccessToken } from "@/lib/auth/session";
import { LoginFormSchema } from "@/lib/schemas/login";
import { RegistrationFormSchema } from "@/lib/schemas/registration";
import { ApiError, ErrorCode, ValidationErrorDetails } from "@/types/api/error";

type FieldErrors<T> = {
  [key in keyof T]?: string;
};

interface ActionResponse<T> {
  status: "success" | "error";
  message: string;
  fieldErrors?: FieldErrors<T>;
}

export async function RegisterAction(
  values: RegistrationFormSchema,
): Promise<ActionResponse<RegistrationFormSchema>> {
  try {
    await authApi.register(values as RegisterRequest);

    return {
      status: "success",
      message: "Регистрация прошла успешно! Теперь вы можете войти.",
    };
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.error === ErrorCode.VALIDATION_ERROR && error.details) {
        const fieldErrors: FieldErrors<RegistrationFormSchema> = {};

        const detailsArray = Array.isArray(error.details)
          ? (error.details as ValidationErrorDetails[])
          : [error.details as ValidationErrorDetails];

        detailsArray.forEach((detail) => {
          if (detail.field) {
            fieldErrors[detail.field as keyof RegistrationFormSchema] =
              detail.message;
          }
        });

        return { status: "error", message: error.message, fieldErrors };
      }
      return {
        status: "error",
        message: error.message + ": Неизвестная ошибка",
      };
    }

    return {
      status: "error",
      message: "Произошла непредвиденная ошибка",
    };
  }
}

export async function LoginAction(
  values: LoginFormSchema,
): Promise<ActionResponse<LoginFormSchema>> {
  try {
    const response = await authApi.login(values as LoginRequest);
    await setAccessToken(response.access_token, values.rememberMe || false);

    return { status: "success", message: "Добро пожаловать!" };
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.error === ErrorCode.UNAUTHORIZED) {
        const fieldErrors: FieldErrors<LoginFormSchema> = {};

        return { status: "error", message: error.message, fieldErrors };
      }
      return {
        status: "error",
        message: error.message + ": Неизвестная ошибка",
      };
    }
  }
  return {
    status: "error",
    message: "Произошла непредвиденная ошибка",
  };
}

export async function LogoutAction() {
  await deleteAccessToken();
  redirect("/");
}
