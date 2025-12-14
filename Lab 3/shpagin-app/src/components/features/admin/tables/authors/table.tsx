"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ContentTable } from "@/components/features/content-table";
import { Author } from "@/types/api";

const columns: ColumnDef<Author>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const id = row.original.id;

      return (
        <p className="text-muted-foreground line-clamp-1 font-mono text-xs leading-tight">
          {id}
        </p>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Имя",
    cell: ({ row }) => <p className="text-md">{row.original.name}</p>,
  },
  {
    accessorKey: "description",
    header: "Описание",
    cell: ({ row }) => (
      <p className="text-muted-foreground break-all">
        {row.original.description || "—"}
      </p>
    ),
  },
];

interface AuthorsTableProps {
  authors: Author[];
}

export function AuthorsTable({ authors }: AuthorsTableProps) {
  return (
    <div className="flex w-full flex-1 flex-col gap-6 py-6">
      <div className="no-scrollbar w-full overflow-x-auto">
        <ContentTable items={authors} columns={columns} />
      </div>
    </div>
  );
}
