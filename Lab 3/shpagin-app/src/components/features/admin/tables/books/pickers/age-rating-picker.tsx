"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AgeRating, ageRatingList } from "@/types/api";

interface AgeRatingSelectProps {
  value: AgeRating["value"];
  onChange: (val: AgeRating["value"] | null) => void;
  placeholder?: string;
}

export function AgeRatingPicker({ value, onChange }: AgeRatingSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(val) => onChange(val as AgeRating["value"])}
    >
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Возрастной рейтинг" />
      </SelectTrigger>
      <SelectContent>
        {ageRatingList.map((rating) => (
          <SelectItem key={rating.value} value={rating.value}>
            {rating.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
