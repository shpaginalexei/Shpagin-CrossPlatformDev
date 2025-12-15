"use client";

import { useState } from "react";

import { FaRegStar, FaStar } from "react-icons/fa";
import { toast } from "sonner";

import { SetRatingAction } from "@/lib/actions/api";

interface StarRatingProps {
  userId: string;
  bookId: string;
  initialRating: number | null;
  totalReviews?: number;
  showNumber?: boolean;
  readOnly?: boolean;
}

export function StarRating({
  userId,
  bookId,
  initialRating,
  readOnly = false,
}: StarRatingProps) {
  const [rating, setRating] = useState<number | null>(initialRating);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const starsCount = 5;
  const currentRating = hoverRating !== null ? hoverRating : rating;

  const handleClick = async (newRating: number) => {
    if (readOnly || isSaving) return;
    setIsSaving(true);
    try {
      const result = await SetRatingAction(userId, bookId, newRating);
      if (result.status === "success") {
        setRating(newRating);
        toast.success("Рейтинг обновлен");
      } else {
        toast.error(result.message || "Ошибка при сохранении рейтинга");
      }
    } catch {
      toast.error("Ошибка при сохранении рейтинга");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex gap-1">
      {[...Array(starsCount)].map((_, i) => {
        const starIndex = i + 1;
        const isFilled = currentRating !== null && starIndex <= currentRating;
        return (
          <button
            key={starIndex}
            type="button"
            onClick={() => handleClick(starIndex)}
            onMouseEnter={() => !readOnly && setHoverRating(starIndex)}
            onMouseLeave={() => !readOnly && setHoverRating(null)}
            disabled={isSaving || readOnly}
            className="focus:outline-none"
          >
            {isFilled ? (
              <FaStar className="size-6 text-yellow-400" />
            ) : (
              <FaRegStar className="text-muted-foreground size-6" />
            )}
          </button>
        );
      })}
    </div>
  );
}
