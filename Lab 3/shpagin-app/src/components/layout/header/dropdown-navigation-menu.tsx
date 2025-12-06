"use client";

import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { LuMenu } from "react-icons/lu";

import { NavigationItem } from "@/components/navigation-item";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { authMenu } from "@/config/navigation-items";

export function DropdownNavigationMenu({ className }: { className?: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" className={className}>
          <LuMenu />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuSeparator />

        {authMenu.map((item, key) => (
          <NavigationItem key={key} item={item} />
        ))}

        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
