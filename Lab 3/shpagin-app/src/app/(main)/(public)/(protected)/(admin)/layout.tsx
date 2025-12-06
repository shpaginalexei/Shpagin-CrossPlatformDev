"use client";

import { PropsWithChildren } from "react";
import { forbidden, redirect } from "next/navigation";

import { useAuth } from "@/lib/auth/context";
import { RoleType } from "@/lib/auth/types";

export default function AdminLayout({ children }: PropsWithChildren<unknown>) {
  const { isAuth, session } = useAuth();

  if (!isAuth) {
    redirect("/login");
  }
  if (session && session.role != RoleType.ADMIN) {
    forbidden();
  }
  return children;
}
