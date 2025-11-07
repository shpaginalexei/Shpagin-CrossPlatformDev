"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="absolute h-10 w-10 scale-100 rotate-0 duration-300 dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-10 w-10 scale-0 rotate-90 duration-300 dark:scale-100 dark:rotate-0" />
    </Button>
  );
}
