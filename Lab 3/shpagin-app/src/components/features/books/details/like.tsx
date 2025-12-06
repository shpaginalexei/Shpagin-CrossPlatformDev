import { FaHeart, FaRegHeart } from "react-icons/fa";

import { Button } from "@/components/ui/button";

interface LikeProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export function Like({ value, onValueChange }: LikeProps) {
  return (
    <Button
      size="icon"
      variant={null}
      className="rounded-full transition-transform active:scale-90"
      onClick={() => onValueChange(!value)}
    >
      {value ? (
        <FaHeart className="size-6 text-rose-500" />
      ) : (
        <FaRegHeart className="size-6 text-rose-500" />
      )}
    </Button>
  );
}
