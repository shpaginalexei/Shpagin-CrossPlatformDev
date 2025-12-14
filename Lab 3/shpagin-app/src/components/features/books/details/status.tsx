import { useState } from "react";

import { LuCheck, LuEllipsis, LuX } from "react-icons/lu";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BookStatus, StatusIcon, TranslateStatus } from "@/types/api";

const options = [
  {
    status: null,
    name: "Выбрать",
    icon: null,
  },
  {
    status: BookStatus.WANT_TO_READ,
    name: TranslateStatus(BookStatus.WANT_TO_READ),
    icon: StatusIcon(BookStatus.WANT_TO_READ),
  },
  {
    status: BookStatus.READING,
    name: TranslateStatus(BookStatus.READING),
    icon: StatusIcon(BookStatus.READING),
  },
  {
    status: BookStatus.COMPLETED,
    name: TranslateStatus(BookStatus.COMPLETED),
    icon: StatusIcon(BookStatus.COMPLETED),
  },
];

interface StatusProps {
  value: BookStatus | null;
  onValueChange: (value: BookStatus | null) => void;
}

export function Status({ value, onValueChange }: StatusProps) {
  const [open, setOpen] = useState(false);
  const selectedStatus = options.find((s) => s.status === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Framework combobox"
          className={cn(
            "justify-between",
            value === BookStatus.WANT_TO_READ &&
              "hover:text-accent-foreground bg-orange-400 hover:bg-orange-500 dark:bg-amber-600 dark:hover:bg-amber-700",
            value === BookStatus.READING &&
              "hover:text-accent-foreground bg-cyan-400 hover:bg-cyan-500 dark:bg-blue-600 dark:hover:bg-blue-700",
            value === BookStatus.COMPLETED &&
              "hover:text-accent-foreground bg-green-400 hover:bg-green-500 dark:bg-emerald-600 dark:hover:bg-emerald-700",
          )}
        >
          {selectedStatus && selectedStatus.name}
          {selectedStatus &&
            (selectedStatus.icon ? (
              <selectedStatus.icon className="size-4" />
            ) : (
              <LuEllipsis className="size-4 opacity-50" />
            ))}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0" align="end">
        <Command>
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.name}
                  value={option.name}
                  onSelect={() => {
                    onValueChange(option.status);
                    setOpen(false);
                  }}
                >
                  {option.icon ? (
                    <option.icon />
                  ) : (
                    <LuX className="opacity-0" />
                  )}
                  <p className="w-full">{option.name}</p>
                  <LuCheck
                    className={
                      value === option.status && option.icon
                        ? "opacity-100"
                        : "opacity-0"
                    }
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
