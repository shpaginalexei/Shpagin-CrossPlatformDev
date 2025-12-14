"use client";

import { useMemo } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface YearPickerProps {
  value: number | null;
  onChange: (year: number | null) => void;
  minYear?: number;
  maxYear?: number;
}

export function YearPicker({
  value,
  onChange,
  minYear = 1000,
  maxYear = new Date().getFullYear(),
  ...props
}: YearPickerProps) {
  const years = useMemo(() => {
    const arr = [];
    for (let y = maxYear; y >= minYear; y--) {
      arr.push(y);
    }
    return arr;
  }, [minYear, maxYear]);

  return (
    <Select
      value={value ? String(value) : ""}
      onValueChange={(val) => onChange(Number(val))}
      {...props}
    >
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Год" />
      </SelectTrigger>
      <SelectContent>
        {years.map((year) => (
          <SelectItem key={year} value={String(year)}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
