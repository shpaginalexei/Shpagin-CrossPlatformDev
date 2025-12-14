"use client";

import { ColumnDef } from "@tanstack/react-table";

import { BookTags } from "@/components/features/books/details/tags";
import { ContentTable } from "@/components/features/content-table";
import { Tag } from "@/types/api";

const columns: ColumnDef<Tag>[] = [
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
    accessorKey: "value",
    header: "Значение",
    cell: ({ row }) => <BookTags tags={[row.original]} className="text-md" />,
  },
];

interface TagsTableProps {
  tags: Tag[];
}

export function TagsTable({ tags }: TagsTableProps) {
  return (
    <div className="flex w-full flex-1 flex-col gap-6 py-6">
      <div className="no-scrollbar w-full overflow-x-auto">
        <ContentTable items={tags} columns={columns} />
      </div>
    </div>
  );
}
