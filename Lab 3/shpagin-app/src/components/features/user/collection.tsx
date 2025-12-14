"use client";

import { ColumnDef } from "@tanstack/react-table";

import { EMPTY_VALUE } from "@/lib/constants";
import { cn, formatDateTime } from "@/lib/utils";
import { Like } from "@/components/features/books/details/like";
import { StarRating } from "@/components/features/books/details/star-rating";
import { ContentTable } from "@/components/features/content-table";
import {
  BookStatus,
  StatusIcon,
  TranslateStatus,
  type UserBook,
} from "@/types/api";

const columns: ColumnDef<UserBook>[] = [
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
    accessorKey: "favorite",
    header: "Избранное",
    cell: ({ row }) => (
      <Like value={row.original.favorite || false} className="size-5" />
    ),
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      const value = row.original.status;
      const IconComponent = value ? StatusIcon(value) : null;

      return (
        <p
          className={cn(
            "inline-flex h-6 items-center gap-2 rounded-sm px-2 py-1 text-xs leading-tight font-medium whitespace-nowrap",
            value === BookStatus.WANT_TO_READ &&
              "bg-orange-400 hover:bg-orange-500 dark:bg-amber-600",
            value === BookStatus.READING && "bg-cyan-400 dark:bg-blue-600",
            value === BookStatus.COMPLETED &&
              "bg-green-400 hover:bg-green-500 dark:bg-emerald-600",
          )}
        >
          {IconComponent && <IconComponent className="size-3" />}
          {value ? TranslateStatus(value) : EMPTY_VALUE}
        </p>
      );
    },
  },
  {
    accessorKey: "rating",
    header: "Рейтинг",
    cell: ({ row }) => (
      <StarRating
        userId=""
        bookId=""
        initialRating={row.original.rating || 0}
        showNumber={false}
        readOnly
      />
    ),
  },
  {
    id: "added_at",
    header: "Добавлено",
    cell: ({ row }) => formatDateTime(row.original.added_at),
  },
  {
    id: "updated_at",
    header: "Обновлено",
    cell: ({ row }) => formatDateTime(row.original.updated_at),
  },
];

interface UserBooksTableProps {
  userBooks: UserBook[];
}

export function UserBooksTable({ userBooks }: UserBooksTableProps) {
  return (
    <div className="flex w-full flex-1 flex-col gap-6 py-6">
      <div className="no-scrollbar w-full overflow-x-auto">
        <ContentTable
          items={userBooks}
          columns={columns}
          getRowHref={(book) => `/books/${book.id}`}
        />
      </div>
    </div>
  );
}
