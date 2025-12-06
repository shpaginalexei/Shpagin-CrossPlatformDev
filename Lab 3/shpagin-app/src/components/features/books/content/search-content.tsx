"use client";

import { use, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { DEFAULT_LAYOUT_TYPE, PER_PAGE_OPTION_LIST } from "@/lib/constants";
import { Book, PaginatedResult } from "@/types/api";
import { LayoutType } from "@/types/common";

import {
  BookSortFilter,
  ContentLayoutTypeSwitch,
  PerPageDropdownMenu,
} from "./control-panel";
import { BooksGrid } from "./grid";
import { BooksPagination } from "./pagination";
import { BooksTable } from "./table";

interface BooksSearchContentProps {
  booksPromise: Promise<PaginatedResult<Book>>;
}

export function BooksSearchContent({ booksPromise }: BooksSearchContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { page, page_size, total_pages, total_count, items } =
    use(booksPromise);

  items.sort((a, b) => a.name.localeCompare(b.name, "ru"));
  const [books, setBooks] = useState(items);

  const [layoutType, setLayoutType] = useState<LayoutType>(() => {
    if (typeof window === "undefined") return DEFAULT_LAYOUT_TYPE;
    const saved = localStorage.getItem("layoutType") as LayoutType | null;
    return saved ?? DEFAULT_LAYOUT_TYPE;
  });

  useEffect(() => {
    localStorage.setItem("layoutType", layoutType);
  }, [layoutType]);

  const handlePageSizeChange = useCallback(
    (newSize: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page_size", newSize.toString());
      params.set("page", "1");
      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  return (
    <>
      {/* Информация о количестве */}
      <div className="flex flex-col items-center justify-between gap-12 md:flex-row md:gap-0">
        <p className="text-muted-foreground line-clamp-1 w-full min-w-fit text-left md:w-fit">
          {books.length > 0
            ? `Найдено книг: ${total_count}`
            : "Ничего не найдено"}
        </p>

        {/* Управление */}
        {books.length > 0 && (
          <div className="flex w-full items-center justify-end gap-6 md:flex-1">
            <BookSortFilter books={books} onSortChange={setBooks} />
            <ContentLayoutTypeSwitch
              layoutType={layoutType}
              onChange={setLayoutType}
            />
          </div>
        )}
      </div>

      {/* Сетка / Таблица */}
      {books.length > 0 &&
        (layoutType === "card" ? (
          <BooksGrid books={books} />
        ) : (
          <BooksTable books={books} />
        ))}

      {/* Пагинация */}
      {books.length > 0 && (
        <div className="flex flex-col-reverse gap-6 pt-6 lg:relative lg:flex-row">
          <div className="z-20 flex items-center">
            <p className="mr-3 text-sm">Показать</p>
            <PerPageDropdownMenu
              value={page_size}
              options={PER_PAGE_OPTION_LIST}
              onChange={handlePageSizeChange}
            />
          </div>
          <BooksPagination
            className="pointer-events-auto z-10 lg:absolute"
            totalPages={total_pages}
            currentPage={page}
          />
        </div>
      )}
    </>
  );
}
