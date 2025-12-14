"use client";

import { ColumnDef } from "@tanstack/react-table";

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
