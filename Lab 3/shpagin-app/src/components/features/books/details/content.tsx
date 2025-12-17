"use client";

import { use, useCallback, useState } from "react";
import { notFound } from "next/navigation";

import { FiBook } from "react-icons/fi";
// import { FiBookOpen } from "react-icons/fi";
import { toast } from "sonner";

import { SetLikeAction, SetStatusAction } from "@/lib/actions/api";
import { BOOK_LOGO_GRADIENT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, BookStatus, UserBook } from "@/types/api";

import { Like } from "./like";
import { StarRating } from "./star-rating";
import { Status } from "./status";
import { BookTags } from "./tags";

interface BookContentProps {
  bookPromise: Promise<Book | null>;
  userId: string;
  userBookPromise: Promise<UserBook | null>;
}

export function BookContent({
  bookPromise,
  userId,
  userBookPromise,
}: BookContentProps) {
  const book = use(bookPromise) ?? notFound();
  const userBook = use(userBookPromise);

  const hasUserBook = userBook !== null;

  const [isLiked, setIsLiked] = useState(
    hasUserBook ? !!userBook.favorite : false,
  );
  const [status, setStatus] = useState(
    hasUserBook ? (userBook.status ? userBook.status : null) : null,
  );

  const handleToggleLike = useCallback(async () => {
    const next = !isLiked;

    const result = await SetLikeAction(userId, book.id, next);

    if (result.status === "error") {
      toast.error(result.message);
    } else {
      setIsLiked(next);
      toast.success(result.message);
    }
  }, [isLiked, userId, book.id]);

  const handleToggleStatus = useCallback(
    async (newStatus: BookStatus | null) => {
      const result = await SetStatusAction(userId, book.id, newStatus);

      if (result.status === "error") {
        toast.error(result.message);
      } else {
        setStatus(newStatus);
        toast.success(result.message);
      }
    },
    [userId, book.id],
  );

  return (
    <div className="flex-1">
      <div className="flex w-full items-center gap-3 md:grid md:grid-cols-1">
        {/* Изображение (desktop) */}
        {/* <div
          className={cn(
            "bg-muted hidden aspect-3/4 h-fit w-full max-w-150 items-center justify-center justify-self-end rounded-lg shadow-lg transition-shadow md:flex",
            BOOK_LOGO_GRADIENT,
          )}
        >
          <FiBookOpen className="text-secondary size-24" />
        </div> */}

        {/* Карточка */}
        <Card className="h-full w-full shadow-lg transition-shadow">
          <CardHeader className="flex items-center">
            <CardTitle className="mt-2 line-clamp-2 text-3xl whitespace-break-spaces">
              {book.name}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-1 flex-col space-y-4">
            {/* Изображение (mobile) */}
            <div
              className={cn(
                "bg-muted flex aspect-3/4 items-center justify-center rounded-lg md:hidden",
                BOOK_LOGO_GRADIENT,
              )}
            >
              <FiBook className="text-muted-foreground size-24" />
            </div>
            {/* Рейтинг со ссылкой на отзывы */}
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div className="flex items-center justify-between gap-3">
                <Like value={isLiked!} onValueChange={handleToggleLike} />
                {book.statistics && (
                  <StarRating
                    userId={userId}
                    bookId={book.id}
                    initialRating={userBook?.rating || 0}
                    totalReviews={book.statistics?.num_ratings}
                  />
                )}
              </div>
              <Status value={status} onValueChange={handleToggleStatus} />
            </div>

            {/* Авторы */}
            <div>
              <p className="text-muted-foreground border-t pt-4 text-xs font-semibold">
                {book.authors.length === 1 ? "Автор" : "Авторы"}
              </p>
              <p className="text-lg">
                {book.authors.map((a) => a.name).join(", ") || "Не указаны"}
              </p>
            </div>

            {/* Информация */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {book.year && (
                <div>
                  <p className="text-muted-foreground text-xs font-semibold">
                    Год издания
                  </p>
                  <p className="text-lg">{book.year}</p>
                </div>
              )}
              {book.publisher && (
                <div>
                  <p className="text-muted-foreground text-xs font-semibold">
                    Издательство
                  </p>
                  <p className="line-clamp-4 text-lg">{book.publisher}</p>
                </div>
              )}
              {book.age_rating && (
                <div>
                  <p className="text-muted-foreground text-xs font-semibold">
                    Возрастное ограничение
                  </p>
                  <p className="text-lg">{book.age_rating.label}</p>
                </div>
              )}
            </div>

            {/* Теги */}
            {book.tags && book.tags.length > 0 && (
              <div>
                <p className="text-muted-foreground mb-2 text-sm font-semibold">
                  Теги
                </p>
                <BookTags tags={book.tags} />
              </div>
            )}

            {/* Аннотация */}
            {book.annotation && (
              <div>
                <p className="text-muted-foreground text-sm font-semibold">
                  Аннотация
                </p>
                <p className="text-base">{book.annotation}</p>
              </div>
            )}

            {/* Статистика */}
            {book.statistics && (
              <div className="text-muted-foreground border-t pt-4 text-xs">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  <div>
                    <span className="block text-lg font-medium">
                      {book.statistics.average_rating.toFixed(2) ?? "-"} (
                      {book.statistics.num_ratings})
                    </span>
                    <span>Средний рейтинг</span>
                  </div>
                  <div>
                    <span className="block text-lg font-medium">
                      {book.statistics.in_favorites}
                    </span>
                    <span>В избранном</span>
                  </div>
                  <div>
                    <span className="block text-lg font-medium">
                      {book.statistics.total_readers}
                    </span>
                    <span>Всего читателей</span>
                  </div>
                  <div>
                    <span className="block text-lg font-medium">
                      {book.statistics.completed}
                    </span>
                    <span>Прочитали</span>
                  </div>
                  <div>
                    <span className="block text-lg font-medium">
                      {book.statistics.reading_now}
                    </span>
                    <span>Читают сейчас</span>
                  </div>
                  <div>
                    <span className="block text-lg font-medium">
                      {book.statistics.want_to_read}
                    </span>
                    <span>Хотят прочитать</span>
                  </div>
                </div>
              </div>
            )}

            {/* Доп. информация */}
            <div className="text-muted-foreground mt-auto border-t pt-4 text-right text-xs">
              {book.created_at && (
                <p>
                  Создано: {new Date(book.created_at).toLocaleString("ru-RU")}
                </p>
              )}
              {book.updated_at && (
                <p>
                  Обновлено: {new Date(book.updated_at).toLocaleString("ru-RU")}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 flex w-full flex-col gap-6 justify-self-end">
        <p className="text-muted-foreground text-right font-mono text-xs">
          ID: {book.id}
        </p>
      </div>
    </div>
  );
}
