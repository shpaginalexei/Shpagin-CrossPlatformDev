"use client";

import { Book } from "@/types/api";

import { BookCard } from "./card";

interface BooksGridProps {
  books: Book[];
}

export function BooksGrid({ books }: BooksGridProps) {
  return (
    <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {/* Сетка */}
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
