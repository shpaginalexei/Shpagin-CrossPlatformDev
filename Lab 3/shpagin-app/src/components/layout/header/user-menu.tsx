"use client";

import Link from "next/link";

import { FaUser } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { LuLogOut } from "react-icons/lu";

import { LogoutAction } from "@/lib/actions/auth";
import { NavigationItem } from "@/components/navigation-item";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/types/api";

import { adminMenu, userMenu } from "@/config/navigation-items";

interface ProfileButtonProps {
  user: User | null;
}

export function UserMenu({ user }: ProfileButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="lg"
          className="flex items-center justify-start gap-2 rounded-full hover:cursor-pointer has-[>svg]:px-0 has-[>svg]:pr-3"
          aria-label="UserMenu"
        >
          <Avatar className="size-10">
            <AvatarFallback>
              <FaUser className="text-foreground/50 size-4" />
            </AvatarFallback>
          </Avatar>
          <FiChevronDown />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuItem asChild>
          <Link
            href="/profile"
            className="flex items-center gap-2 hover:cursor-pointer"
          >
            <div className="flex flex-col space-y-1 p-1">
              <p className="leading-none font-medium">
                {/* FIXME если очень длинный */}
                {user?.user_name || "Мой аккаунт"}
              </p>
              <p className="text-muted-foreground text-xs leading-none">
                {/* FIXME если очень длинный */}
                {user?.email}
              </p>
            </div>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {user && user.is_admin && (
          <>
            {adminMenu.map((item, key) => (
              <NavigationItem key={key} item={item} />
            ))}
            <DropdownMenuSeparator />
          </>
        )}

        {userMenu.map((item, key) => (
          <NavigationItem key={key} item={item} />
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={async () => await LogoutAction()}
          className="hover:cursor-pointer"
        >
          <LuLogOut className="text-destructive size-4" />
          <Button
            type="button"
            variant={null}
            className="text-destructive h-auto p-0"
          >
            Выход
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
