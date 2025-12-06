"use client";

import Link from "next/link";

import { LuX } from "react-icons/lu";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MenuItem } from "@/types/common";

export function NavigationItem({ item }: { item: MenuItem }) {
  return (
    <DropdownMenuItem asChild>
      <Link
        href={item.href}
        className="flex items-center gap-2 hover:cursor-pointer"
      >
        {item.icon ? (
          <item.icon className="size-4" />
        ) : (
          <LuX className="size-4 opacity-0" />
        )}
        {item.name}
      </Link>
    </DropdownMenuItem>
  );
}
