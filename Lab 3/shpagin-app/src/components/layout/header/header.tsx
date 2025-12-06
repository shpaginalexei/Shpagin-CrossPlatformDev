import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

import { ControlPanel } from "./control-panel";
import { SearchWrapper } from "./search";

export async function Header() {
  return (
    <header
      role="banner"
      className={
        "border-muted grid grid-cols-1 items-center gap-4 border-b px-6 py-4 lg:grid-cols-[auto_1fr_auto] lg:gap-20"
      }
    >
      <div className="flex items-center justify-between">
        {/* Левая часть */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="Logo" width={36} height={36} priority />
            <h2 className="shrink-0 pl-1 text-2xl font-bold">NextBook</h2>
          </Link>
        </div>

        {/* Правая часть (для mobile) */}
        <ControlPanel className="flex justify-end lg:hidden" />
      </div>

      {/* Поиск */}
      <div className="order-last lg:order-0">
        <Suspense>
          <SearchWrapper />
        </Suspense>
      </div>

      {/* Правая часть (для desktop) */}
      <ControlPanel className="hidden justify-end lg:flex" />
    </header>
  );
}
