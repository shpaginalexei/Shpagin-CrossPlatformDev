"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

import { useAuth } from "@/lib/auth/context";
import { cn } from "@/lib/utils";
import { LoadingFallback } from "@/components/loading-fallback";
import { ThemeToggle } from "@/components/theme-toggle";

import { AuthButtons } from "./auth-buttons";
import { DropdownNavigationMenu } from "./dropdown-navigation-menu";

const DynamicUserMenu = dynamic(
  () => import("./user-menu").then((mod) => mod.UserMenu),
  {
    ssr: false,
  },
);

function AuthControl() {
  const { isAuth, user } = useAuth();

  if (isAuth) {
    return <DynamicUserMenu user={user} />;
  }

  return (
    <>
      <AuthButtons className="hidden sm:flex" />
      <DropdownNavigationMenu className="flex sm:hidden" />
    </>
  );
}

export function ControlPanel({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <ThemeToggle />
      <Suspense fallback={<LoadingFallback className="h-10 w-19" />}>
        <AuthControl />
      </Suspense>
    </div>
  );
}
