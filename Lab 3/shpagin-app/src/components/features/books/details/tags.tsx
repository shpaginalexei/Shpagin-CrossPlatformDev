"use client";

import { useMemo } from "react";

import { cn, uuidToColor } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tag } from "@/types/api";

interface BookTagsProps {
  tags: Tag[] | null;
  className?: string;
}

export function BookTags({ tags, className }: BookTagsProps) {
  const tagStyles = useMemo(() => {
    if (!tags) return [];

    return tags.map((tag) => ({
      "--tag-light": uuidToColor(tag.id, tag.value, false),
      "--tag-dark": uuidToColor(tag.id, tag.value, true),
    }));
  }, [tags]);

  if (!tags?.length) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag, key) => (
        <Badge
          key={key}
          variant="secondary"
          className="text-accent-foreground bg-(--tag-light) dark:bg-(--tag-dark)"
          style={
            {
              "--tag-light": tagStyles[key]["--tag-light"],
              "--tag-dark": tagStyles[key]["--tag-dark"],
            } as React.CSSProperties
          }
        >
          {tag.value}
        </Badge>
      ))}
    </div>
  );
}
