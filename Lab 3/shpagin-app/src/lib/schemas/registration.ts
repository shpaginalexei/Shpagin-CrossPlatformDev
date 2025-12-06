import z from "zod";

import { MIN_DATE } from "@/lib/constants";

export const registrationFormSchema = z
  .object({
    user_name: z
      .string()
      .nonempty("Обязательное поле")
      .min(5, { message: "Минимум 5 символов" })
      .max(32, { message: "Максимум 32 символа" })
      .regex(/^[a-z][a-z0-9_]{4,31}$/, {
        message:
          "Можно использовать только a-z, 0-9, _, и имя должно начинаться с буквы",
      })
      .trim(),

    display_name: z
      .string()
      .max(32, { message: "Максимум 32 символа" })
      .nullable(), // Allow null

    email: z.email({ message: "Некорректный email" }).trim(),

    birth_date: z
      .string()
      .nullable() // Allow null
      .refine((value) => {
        if (!value) return true;
        return !isNaN(new Date(value).getTime());
      }, "Неверный формат даты")
      .optional()

      .refine(
        (value) => {
          if (!value) return true;
          return new Date(value) >= MIN_DATE;
        },
        `Дата рождения не может быть раньше ${MIN_DATE.toLocaleDateString("ru-RU")}`,
      )

      .refine((value) => {
        if (!value) return true;
        return new Date(value) <= new Date();
      }, "Дата рождения не может быть в будущем"),

    password: z
      .string()
      .nonempty("Обязательное поле")
      .min(8, { message: "Минимум 8 символов" })
      .max(32, { message: "Максимум 32 символа" })
      .regex(/^[a-zA-Z0-9!@#$%^&*()_\-+=]+$/, {
        message:
          "Пароль может содержать только символы a-z, A-Z, 0-9, и !@#$%^&*()_\\-+=.",
      })
      .trim(),

    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password !== "" && data.password === data.confirmPassword,
    {
      message: "Пароли не совпадают",
      path: ["confirmPassword"],
    },
  );

export type RegistrationFormSchema = z.infer<typeof registrationFormSchema>;
