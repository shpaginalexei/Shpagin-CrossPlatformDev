"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { FiLock, FiUser } from "react-icons/fi";
import { toast } from "sonner";

import { LoginAction } from "@/lib/actions/auth";
import { LoginFormSchema, loginFormSchema } from "@/lib/schemas/login";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    mode: "all",
    defaultValues: {
      user_name: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(data: LoginFormSchema) {
    startTransition(async () => {
      const result = await LoginAction(data);

      if (result.status === "error") {
        setLoginError(true);
        toast.error(result.message);

        form.setError("user_name", { message: "" });
        form.setError("password", { message: "" });
      } else {
        setLoginError(false);
        toast.success(result.message);

        router.push("/");
        return;
      }
    });
  }

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="pt-3 text-center">
        <CardTitle className="text-3xl font-bold">Добро пожаловать!</CardTitle>
        <CardDescription></CardDescription>
        <CardDescription
          className={loginError ? "text-destructive" : "text-muted-foreground"}
        >
          {loginError
            ? "Неверный логин или пароль"
            : "Введите логин и пароль, чтобы войти в аккаунт"}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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

            {/* Запомнить меня */}
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked)}
                    />
                  </FormControl>
                  <FormLabel>Запомнить меня</FormLabel>
                </FormItem>
              )}
            />

            {/* Кнопка */}
            <Button disabled={isPending} className="w-full" type="submit">
              {isPending ? <LoadingFallback /> : "Войти"}
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="text-muted-foreground flex justify-between text-sm">
        {/* Назад */}
        <BackButton />

        {/* Зарегистрироваться */}
        <p>
          <Link href={`/signup`} className="hover:text-accent-foreground">
            Зарегистрироваться
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
