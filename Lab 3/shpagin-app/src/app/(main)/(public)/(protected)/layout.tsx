"use client";

import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";

import { useAuth } from "@/lib/auth/context";

export default function ProtectedLayout({
  children,
}: PropsWithChildren<unknown>) {
  const { isAuth } = useAuth();

  if (!isAuth) {
    redirect("/login");
  }

  return children;
}
