"use client";

import { ColumnDef } from "@tanstack/react-table";

import { EMPTY_VALUE } from "@/lib/constants";
import { BookTags } from "@/components/features/books/details/tags";
import { ContentTable } from "@/components/features/content-table";
import type { Book } from "@/types/api";

const columns: ColumnDef<Book>[] = [
  {
    accessorKey: "name",
    header: "Название",
    cell: ({ row }) => (
      <p className="line-clamp-4 leading-tight break-all">
        {row.original.name}
      </p>
    ),
  },
  {
    id: "tags",
    header: "Теги",
    cell: ({ row }) => {
      const tags = row.original.tags;
      if (!tags?.length)
        return <p className="text-muted-foreground min-w-80">{EMPTY_VALUE}</p>;

      return <BookTags tags={tags} className="min-w-80" />;
    },
  },
  {
    accessorKey: "authors",
    header: "Авторы",
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground whitespace-break-spaces">
          {row.original.authors.map((a) => a.name).join(", ")}
        </div>
      );
    },
  },
];

interface BooksTableProps {
  books: Book[];
}

export function BooksTable({ books }: BooksTableProps) {
  return (
    <ContentTable
      items={books}
      columns={columns}
      getRowHref={(book) => `/books/${book.id}`}
    />
  );
}
