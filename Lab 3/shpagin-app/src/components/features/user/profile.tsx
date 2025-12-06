"use client";

import { FaUser } from "react-icons/fa";
import { LuSettings } from "react-icons/lu";

import { useAuth } from "@/lib/auth/context";
import { PROFILE_HERO_GRADIENT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
                <p className="text-blue-400">Изменить</p>
              </div>
            </div>

            {/* Дата рождения */}
            <div className="flex flex-col gap-1 border-b pb-3 md:flex-row md:items-center">
              <p className="text-muted-foreground font-semibold md:w-40">
                Дата рождения
              </p>
              <div className="flex flex-1 justify-between">
                {user.birth_date ? (
                  <p className="flex-1">{user.birth_date}</p>
                ) : (
                  <p className="text-muted-foreground flex-1">Не указано</p>
                )}
                <p className="text-blue-400">Изменить</p>
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
              <p className="text-muted-foreground w-40 font-semibold">Создан</p>
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
                <p className="text-blue-400">Изменить</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1 border-b pb-3 md:flex-row md:items-center">
              <p className="text-muted-foreground font-semibold md:w-40">
                Email
              </p>
              <div className="flex flex-1 justify-between">
                <p className="flex-1">{user.email}</p>
                <p className="text-blue-400">Изменить</p>
              </div>
            </div>

            {/* Пароль */}
            <div className="flex flex-col gap-1 border-b pb-3 md:flex-row md:items-center">
              <p className="text-muted-foreground font-semibold md:w-40">
                Пароль
              </p>
              <p className="flex-1 text-blue-400">Изменить пароль</p>
            </div>

            {/* Удалить аккаунт */}
            <div className="flex items-center pb-3">
              <Button
                variant="outline"
                className="text-destructive border-destructive hover:text-destructive hover:cursor-pointer"
              >
                Удалить аккаунт
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
