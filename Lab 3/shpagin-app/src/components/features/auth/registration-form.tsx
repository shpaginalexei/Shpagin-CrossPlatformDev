"use client";

import { useState, useTransition } from "react";
import { redirect } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { FiCalendar, FiLock, FiMail, FiUser } from "react-icons/fi";
import { toast } from "sonner";

import { RegisterAction } from "@/lib/actions/auth";
import { MIN_DATE } from "@/lib/constants";
import {
  RegistrationFormSchema,
  registrationFormSchema,
} from "@/lib/schemas/registration";
import { BackButton } from "@/components/back-button";
import { LoadingFallback } from "@/components/loading-fallback";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const today = new Date().toISOString().split("T")[0];

  const form = useForm<RegistrationFormSchema>({
    resolver: zodResolver(registrationFormSchema),
    mode: "all",
    defaultValues: {
      display_name: null,
      email: "",
      user_name: "",
      birth_date: null,
      password: "",
      confirmPassword: "",
    },
  });

  const [regError, setRegError] = useState(false);

  async function onSubmit(data: RegistrationFormSchema) {
    startTransition(async () => {
      const result = await RegisterAction(data);

      if (result.status === "error") {
        setRegError(true);

        if (result.fieldErrors) {
          for (const [field, message] of Object.entries(result.fieldErrors)) {
            if (field && message && message.length > 0) {
              form.setError(field as keyof RegistrationFormSchema, {
                message: message,
              });
            }
          }
        }
        toast.error(result.message);
      } else {
        setRegError(false);

        toast.success(result.message);
        redirect("/login");
      }
    });
  }

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="pt-3 text-center">
        <CardTitle className="text-3xl font-bold">Регистрация</CardTitle>
        <CardDescription
          className={regError ? "text-destructive" : "text-muted-foreground"}
        >
          {regError
            ? "Некоторые данные введены не коректно"
            : "Введите данные для регистрации"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
          >
            {/* Имя */}
            <FormField
              control={form.control}
              name="display_name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <FiUser className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2" />
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Имя"
                        className="pl-9"
                        aria-invalid={!!fieldState.error}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <FiMail className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2" />
                      <Input
                        {...field}
                        type="email"
                        placeholder="user@example.com"
                        className="pl-9"
                        aria-invalid={!!fieldState.error}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Логин */}
            <FormField
              control={form.control}
              name="user_name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Логин</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <FiUser className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2" />
                      <Input
                        {...field}
                        placeholder="Логин"
                        className="pl-9"
                        aria-invalid={!!fieldState.error}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Дата рождения */}
            <FormField
              control={form.control}
              name="birth_date"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Дата рождения</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <FiCalendar className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2" />
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        type="date"
                        step="1"
                        min={String(MIN_DATE)}
                        max={today}
                        className="text-muted-foreground appearance-none pl-9 text-sm [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        aria-invalid={!!fieldState.error}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Пароль */}
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <FiLock className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2" />
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        className="px-9"
                        aria-invalid={!!fieldState.error}
                      />
                      <Button
                        type="button"
                        variant={null}
                        className="hover:text-accent-foreground text-muted-foreground absolute top-1/2 right-0 -translate-y-1/2 transform"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Подтверждение пароля */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Подтвердите пароль</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <FiLock className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2" />
                      <Input
                        {...field}
                        type="password"
                        className="px-9"
                        aria-invalid={!!fieldState.error}
                        onPaste={(e) => e.preventDefault()}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Кнопка */}
            <Button disabled={isPending} type="submit" className="mt-4 w-full">
              {isPending ? <LoadingFallback /> : "Зарегистрироваться"}
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="text-muted-foreground flex justify-between text-sm">
        {/* Назад */}
        <BackButton />
      </CardFooter>
    </Card>
  );
}
