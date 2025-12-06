"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { LuSearch } from "react-icons/lu";

import { useAuth } from "@/lib/auth/context";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export function SearchWrapper() {
  const { isAuth } = useAuth();

  if (isAuth) return <Search />;
  else return null;
}

interface SearchProps {
  className?: string;
}

export function Search({ className }: SearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || "",
  );

  const handleSearch = () => {
    const trimmedValue = searchValue.trim();
    const params = new URLSearchParams(searchParams);

    if (trimmedValue) {
      params.set("search", trimmedValue);
      router.push(`/books?${params.toString()}`);
    } else {
      router.push("/books");
    }
  };

  return (
    <form action={handleSearch} className={cn("relative w-full", className)}>
      <LuSearch className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2" />
      <Input
        placeholder="Поиск"
        name="search"
        value={searchValue}
        className="focus-visible:border-input pl-9 transition-colors focus-visible:ring-0"
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </form>
  );
}
