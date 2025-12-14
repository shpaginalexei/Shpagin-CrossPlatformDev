"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LuSettings } from "react-icons/lu";

import { formatDateTime } from "@/lib/utils";
import { ContentTable } from "@/components/features/content-table";
import { User } from "@/types/api";

const columns: ColumnDef<User>[] = [
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
    header: "Имя",
    cell: ({ row }) => (
      <p className="flex min-w-40 items-center leading-tight break-all">
        {row.original.is_admin && <LuSettings className="size-5 pr-1" />}{" "}
        {row.original.user_name}
      </p>
    ),
  },
  {
    accessorKey: "display_name",
    header: "Имя",
    cell: ({ row }) => (
      <p className="text-muted-foreground">
        {row.original.display_name || "—"}
      </p>
    ),
  },
  {
    accessorKey: "birth_date",
    header: "Дата рождения",
    cell: ({ row }) => {
      const birth_date = row.original.birth_date;
      if (!birth_date) return <p className="text-muted-foreground">—</p>;
      const date = new Date(birth_date);
      return (
        <p className="text-muted-foreground text-xs">
          {date.toLocaleDateString("ru-RU")}
        </p>
      );
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
];

interface UsersTableProps {
  users: User[];
}

export function UsersTable({ users }: UsersTableProps) {
  return (
    <div className="flex w-full flex-1 flex-col gap-6 py-6">
      <div className="no-scrollbar w-full overflow-x-auto">
        <ContentTable items={users} columns={columns} />
      </div>
    </div>
  );
}
