"use client";

import { ColumnDef } from "@tanstack/react-table";

import {
  AddBookAction,
  DeleteBookAction,
  UpdateBookAction,
} from "@/lib/actions/api";
import { EMPTY_VALUE } from "@/lib/constants";
import { AddBookSchema, UpdateBookSchema } from "@/lib/schemas/book";
import { formatDateTime } from "@/lib/utils";
import { BookTags } from "@/components/features/books/details/tags";
import { ContentTable } from "@/components/features/content-table";
import { Author, Book, Tag } from "@/types/api";

import { AddDialog } from "./add-dialog";
import { EditDialog } from "./edit-dialog";

import { DeleteConfirmDialog } from "../utils/delete-confirm";

const columns = (allAuthors: Author[], allTags: Tag[]): ColumnDef<Book>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <p className="text-muted-foreground font-mono text-xs leading-tight whitespace-nowrap">
        {row.original.id}
      </p>
    ),
  },
  {
    accessorKey: "name",
    header: "Название",
    cell: ({ row }) => (
      <p className="line-clamp-4 min-w-40 leading-tight break-all">
        {row.original.name}
      </p>
    ),
  },
  {
    accessorKey: "authors",
    header: "Авторы",
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground min-w-40">
          {row.original.authors.map((a) => a.name).join(", ")}
        </div>
      );
    },
  },
  {
    accessorKey: "age_rating",
    header: "Возраст",
    cell: ({ row }) => {
      return (
        <p className="text-muted-foreground">
          {row.original.age_rating?.label || EMPTY_VALUE}
        </p>
      );
    },
  },
  {
    accessorKey: "year",
    header: "Год",
    cell: ({ row }) => {
      return (
        <p className="text-muted-foreground">
          {row.original.year || EMPTY_VALUE}
        </p>
      );
    },
  },
  {
    accessorKey: "publisher",
    header: "Издатель",
    cell: ({ row }) => {
      return (
        <p className="text-muted-foreground line-clamp-4 break-all">
          {row.original.publisher || EMPTY_VALUE}
        </p>
      );
    },
  },
  {
    accessorKey: "annotation",
    header: "Аннотация",
    cell: ({ row }) => {
      return (
        <p className="text-muted-foreground line-clamp-4 min-w-80 break-all">
          {row.original.annotation || EMPTY_VALUE}
        </p>
      );
    },
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
    id: "created_at",
    header: "Создана",
    cell: ({ row }) => formatDateTime(row.original.created_at),
  },
  {
    id: "updated_at",
    header: "Обновлена",
    cell: ({ row }) => formatDateTime(row.original.updated_at),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="text-muted-foreground flex flex-row items-center pr-6">
        <EditDialog
          book={row.original}
          allAuthors={allAuthors}
          allTags={allTags}
          updateAction={(data: UpdateBookSchema) =>
            UpdateBookAction(row.original.id, data)
          }
        />
        <DeleteConfirmDialog
          info={'"' + row.original.name + '"'}
          deleteAction={() => DeleteBookAction(row.original.id)}
        />
      </div>
    ),
  },
];

interface BooksTableProps {
  books: Book[];
  authors: Author[];
  tags: Tag[];
}

export function BooksTable({ books, authors, tags }: BooksTableProps) {
  return (
    <div className="flex w-full flex-1 flex-col gap-6 py-6">
      <AddDialog
        allAuthors={authors}
        allTags={tags}
        addAction={(data: AddBookSchema) => AddBookAction(data)}
      />
      <div className="no-scrollbar w-full overflow-x-auto">
        <ContentTable items={books} columns={columns(authors, tags)} />
      </div>
    </div>
  );
}
