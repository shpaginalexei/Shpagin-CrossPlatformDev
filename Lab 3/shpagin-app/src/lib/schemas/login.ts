import { z } from "zod";

export const loginFormSchema = z.object({
  user_name: z.string().nonempty("Имя пользователя обязательно"),
  password: z.string().nonempty("Пароль обязателен"),
  rememberMe: z.boolean().default(false).optional(),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
