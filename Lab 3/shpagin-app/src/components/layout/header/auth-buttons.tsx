import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface AuthButtonsProps {
  className?: string;
}

export function AuthButtons({ className }: AuthButtonsProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Link href={`/login`}>
        <Button variant="ghost" className="rounded-md">
          Войти
        </Button>
      </Link>
      <Link href={`/signup`}>
        <Button size="lg" className="rounded-md">
          Зарегистрироваться
        </Button>
      </Link>
    </div>
  );
}
