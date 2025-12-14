import { FaHeart, FaRegHeart } from "react-icons/fa";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface LikeProps {
  value: boolean;
  onValueChange?: (value: boolean) => void;
  className?: string;
}

export function Like({ value, onValueChange, className }: LikeProps) {
  return (
    <Button
      size="icon"
      variant={null}
      className={
        onValueChange && "rounded-full transition-transform active:scale-90"
      }
      onClick={onValueChange ? () => onValueChange(!value) : undefined}
    >
      {value ? (
        <FaHeart className={cn("size-6 text-rose-500", className)} />
      ) : (
        <FaRegHeart className={cn("size-6 text-rose-500", className)} />
      )}
    </Button>
  );
}
