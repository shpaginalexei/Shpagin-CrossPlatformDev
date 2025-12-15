"use client";

import { FaUser } from "react-icons/fa";
import { LuSettings } from "react-icons/lu";
import z from "zod";

import { UpdateUserAction } from "@/lib/actions/api";
import { useAuth } from "@/lib/auth/context";
import { MIN_DATE, PROFILE_HERO_GRADIENT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { EditOneElementDialog } from "./edit-dialog";

import { profileMenu } from "@/config/navigation-items";

export function UserProfileContent() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex flex-1 flex-col gap-6">
      {/* Hero */}
      <div
        className={cn(
          "-mx-6 flex flex-col items-center gap-6 rounded-2xl px-6 py-12 lg:flex-row lg:gap-12 lg:px-12",
          PROFILE_HERO_GRADIENT,
        )}
      >
        <Avatar className="relative size-30 overflow-visible bg-transparent shadow-2xl">
          <AvatarFallback className="bg-neutral-400">
            <FaUser className="size-12 text-neutral-200 dark:text-neutral-600" />
            {user.is_admin && (
              <LuSettings className="absolute right-1/6 bottom-1/6 size-8 fill-neutral-200 text-neutral-600 dark:fill-neutral-600 dark:text-neutral-200" />
            )}
          </AvatarFallback>
        </Avatar>

        <div className="flex w-full flex-col justify-start lg:flex-1">
          <h2 className="text-3xl font-bold">{user.user_name}</h2>
          <p className="text-muted-foreground font-mono text-sm">
            ID:{user.id}
          </p>
        </div>
      </div>

      {/* Информация */}
      <div className="flex-1 gap-6 lg:px-6">
        <Card className="bg-background dark:bg-accent -mt-12 w-full overflow-hidden rounded-2xl shadow-lg transition-shadow lg:p-12">
          <CardHeader className="flex items-center">
            <CardTitle className="mt-2 line-clamp-3 text-xl">
              {profileMenu[0].name}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-1 flex-col space-y-3">
            {/* Имя */}
            <div className="flex flex-col gap-1 border-b pb-3 md:flex-row md:items-center">
              <p className="text-muted-foreground font-semibold md:w-40">Имя</p>
              <div className="flex flex-1 justify-between">
                {user.display_name ? (
                  <p className="flex-1">{user.display_name}</p>
                ) : (
                  <p className="text-muted-foreground flex-1">Не указано</p>
                )}
                <EditOneElementDialog
                  title="Изменить имя"
                  label="Имя"
                  valueSchema={z.object({
                    value: z
                      .string()
                      .max(32, { message: "Максимум 32 символа" })
                      .nullable(),
                  })}
                  defaultValues={{ value: user.display_name || "" }}
                  updateAction={async (data: { value: string | null }) =>
                    UpdateUserAction(user.id, {
                      display_name: data.value,
                      birth_date: user.birth_date,
                    })
                  }
                />
              </div>
            </div>

            {/* Дата рождения */}
            <div className="flex flex-col gap-1 border-b pb-3 md:flex-row md:items-center">
              <p className="text-muted-foreground font-semibold md:w-40">
                Дата рождения
              </p>
              <div className="flex flex-1 justify-between">
                {user.birth_date ? (
                  <p className="flex-1">
                    {new Date(user.birth_date).toLocaleDateString("ru-RU")}
                  </p>
                ) : (
                  <p className="text-muted-foreground flex-1">Не указано</p>
                )}
                <EditOneElementDialog
                  title="Изменить дату рождения"
                  label="Дата рождения"
                  type="date"
                  valueSchema={z.object({
                    value: z
                      .string()
                      .nullable()
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
                  })}
                  defaultValues={{ value: user.birth_date || null }}
                  updateAction={async (data: { value: string | null }) =>
                    UpdateUserAction(user.id, {
                      display_name: user.display_name,
                      birth_date: data.value === "" ? null : data.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Роль */}
            <div className="flex flex-col gap-1 border-b pb-3 md:flex-row md:items-center">
              <p className="text-muted-foreground w-40 font-semibold">Роль</p>
              <p className="flex-1">
                {user.is_admin ? "Администратор" : "Пользователь"}
              </p>
            </div>

            {/* Создан */}
            <div className="flex flex-col gap-1 border-b pb-3 md:flex-row md:items-center">
              <p className="text-muted-foreground w-40 font-semibold">Создан</p>
              <p className="text-muted-foreground flex-1">
                {new Date(user.created_at).toLocaleString("ru-RU")}
              </p>
            </div>

            {/* Обновлен */}
            <div className="flex flex-col gap-1 border-b pb-3 md:flex-row md:items-center">
              <p className="text-muted-foreground w-40 font-semibold">
                Обновлен
              </p>
              <p className="text-muted-foreground flex-1">
                {new Date(user.updated_at).toLocaleString("ru-RU")}
              </p>
            </div>
          </CardContent>

          <CardHeader className="flex items-center">
            <CardTitle className="mt-2 line-clamp-3 text-xl">
              {profileMenu[1].name}
            </CardTitle>
          </CardHeader>

          <CardContent className="min-h- flex flex-1 flex-col space-y-3">
            {/* Логин */}
            <div className="flex flex-col gap-1 border-b pb-3 md:flex-row md:items-center">
              <p className="text-muted-foreground font-semibold md:w-40">
                Логин
              </p>
              <div className="flex flex-1 justify-between">
                <p className="flex-1">{user.user_name}</p>
                <EditOneElementDialog
                  title="Изменить логин"
                  label="Логин"
                  type="string"
                  valueSchema={z.object({
                    value: z
                      .string()
                      .nonempty("Обязательное поле")
                      .min(5, { message: "Минимум 5 символов" })
                      .max(32, { message: "Максимум 32 символа" })
                      .regex(/^[a-z][a-z0-9_]{4,31}$/, {
                        message:
                          "Можно использовать только a-z, 0-9, _, и имя должно начинаться с буквы",
                      })
                      .trim(),
                  })}
                  defaultValues={{ value: user.user_name || "" }}
                  updateAction={async (data: { value: string }) =>
                    UpdateUserAction(user.id, {
                      user_name: data.value,
                      display_name: user.display_name,
                      birth_date: user.birth_date,
                    })
                  }
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1 border-b pb-3 md:flex-row md:items-center">
              <p className="text-muted-foreground font-semibold md:w-40">
                Email
              </p>
              <div className="flex flex-1 justify-between">
                <p className="flex-1">{user.email}</p>
                <EditOneElementDialog
                  title="Изменить email"
                  label="Email"
                  type="email"
                  valueSchema={z.object({
                    value: z.email({ message: "Некорректный email" }).trim(),
                  })}
                  defaultValues={{ value: user.email || "" }}
                  updateAction={async (data: { value: string }) =>
                    UpdateUserAction(user.id, {
                      email: data.value,
                      display_name: user.display_name,
                      birth_date: user.birth_date,
                    })
                  }
                />
              </div>
            </div>

            {/* Пароль */}
            <div className="flex flex-col gap-1 border-b pb-3 md:flex-row md:items-center">
              <p className="text-muted-foreground font-semibold md:w-40">
                Пароль
              </p>
              {/* <p className="flex-1 text-blue-400">Изменить пароль</p> */}
              <EditOneElementDialog
                text="Изменить пароль"
                title="Изменить пароль"
                label="Пароль"
                type="password"
                valueSchema={z.object({
                  value: z
                    .string()
                    .nonempty("Обязательное поле")
                    .min(8, { message: "Минимум 8 символов" })
                    .max(32, { message: "Максимум 32 символа" })
                    .regex(/^[a-zA-Z0-9!@#$%^&*()_\-+=]+$/, {
                      message:
                        "Пароль может содержать только символы a-z, A-Z, 0-9, и !@#$%^&*()_\\-+=.",
                    })
                    .trim(),
                })}
                defaultValues={{ value: "" }}
                updateAction={async (data: { value: string }) =>
                  UpdateUserAction(user.id, {
                    password: data.value,
                    display_name: user.display_name,
                    birth_date: user.birth_date,
                  })
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
