"use client";

import { useState } from "react";

import { FiChevronDown } from "react-icons/fi";
import { TbLayoutGrid, TbLayoutList } from "react-icons/tb";

import { ALTERNATIVE_LAYOUT_TYPE, DEFAULT_LAYOUT_TYPE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Book } from "@/types/api";
import { LayoutType } from "@/types/common";

interface PerPageDropdownMenuProps {
  value: number;
  options: number[];
  onChange: (newSize: number) => void;
}

export function PerPageDropdownMenu({
  value,
  options,
  onChange,
}: PerPageDropdownMenuProps) {
  const [option, setOption] = useState(value);

  function onValueChange(value: string) {
    setOption(Number(value));
    onChange(Number(value));
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-9 min-w-18 hover:cursor-pointer">
          <p className="flex-1">{option}</p>
          <FiChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 translate-x-2">
        <DropdownMenuRadioGroup
          value={option.toString()}
          onValueChange={onValueChange}
        >
          {options.map((x) => (
            <DropdownMenuRadioItem
              key={x}
              value={x.toString()}
              className="hover:cursor-pointer"
            >
              {x} элементов
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface SwitchContentDisplayOptionProps {
  layoutType: LayoutType;
  onChange: (newState: LayoutType) => void;
}

export function ContentLayoutTypeSwitch({
  layoutType,
  onChange,
}: SwitchContentDisplayOptionProps) {
  const [checked, setChecked] = useState<boolean>(
    layoutType === DEFAULT_LAYOUT_TYPE,
  );

  function onCheckedChange(value: boolean) {
    setChecked(value);
    onChange(value ? DEFAULT_LAYOUT_TYPE : ALTERNATIVE_LAYOUT_TYPE);
  }

  return (
    <div className="mr-4.5 inline-grid w-18 grid-cols-[auto_auto] items-center text-sm font-medium">
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="dark:data-[state=unchecked]:bg-input/30 dark:data-[state=checked]:bg-input/30 data-[state=checked]:bg-background peer ring-ring/50 [&_span]:bg-input [&_span]:dark:data-[state=checked]:bg-input/80 [&_span]:dark:data-[state=unchecked]:bg-input data-[state=unchecked]:bg-background h-9 w-18 border-0 ring hover:cursor-pointer [&_span]:size-9 [&_span]:transition-transform [&_span]:duration-300"
      />
      <span className="peer-data-[state=checked]:text-muted-foreground pointer-events-none absolute flex size-9 items-center justify-center text-center">
        <TbLayoutList className="size-5" aria-hidden="true" />
      </span>
      <span className="peer-data-[state=unchecked]:text-muted-foreground pointer-events-none absolute flex size-9 translate-x-9 items-center justify-center text-center">
        <TbLayoutGrid className="size-5" aria-hidden="true" />
      </span>
    </div>
  );
}

export type SortOption =
  | "name-asc"
  | "name-desc"
  | "author-asc"
  | "author-desc";

interface BookSortFilterProps {
  books: Book[];
  onSortChange: (sortedBooks: Book[]) => void;
}

export function BookSortFilter({ books, onSortChange }: BookSortFilterProps) {
  const handleSortChange = (sortType: SortOption) => {
    const sorted = [...books];

    switch (sortType) {
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name, "ru"));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name, "ru"));
        break;
      case "author-asc":
        sorted.sort((a, b) => {
          const authorA = a.authors?.[0]?.name || "";
          const authorB = b.authors?.[0]?.name || "";
          return authorA.localeCompare(authorB, "ru");
        });
        break;
      case "author-desc":
        sorted.sort((a, b) => {
          const authorA = a.authors?.[0]?.name || "";
          const authorB = b.authors?.[0]?.name || "";
          return authorB.localeCompare(authorA, "ru");
        });
        break;
    }

    onSortChange(sorted);
  };

  return (
    <Select defaultValue="name-asc" onValueChange={handleSortChange}>
      <SelectTrigger className="truncate md:w-64">
        <SelectValue placeholder="Выберите сортировку..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="name-asc">Название (А-Я)</SelectItem>
        <SelectItem value="name-desc">Название (Я-А)</SelectItem>
        <SelectItem value="author-asc">Автор (А-Я)</SelectItem>
        <SelectItem value="author-desc">Автор (Я-А)</SelectItem>
      </SelectContent>
    </Select>
  );
}
