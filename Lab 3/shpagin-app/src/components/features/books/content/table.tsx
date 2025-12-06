"use client";

import { useRouter } from "next/navigation";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Author, Book } from "@/types/api";

interface BooksTableProps {
  books: Book[];
}

const columns: ColumnDef<Book>[] = [
  {
    accessorKey: "name",
    header: "Название",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <span className="text-base leading-tight font-medium">
          {row.getValue("name")}
        </span>
        {row.original.publisher && (
          <span className="text-muted-foreground text-xs">
            {row.original.publisher}
          </span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "authors",
    header: "Авторы",
    cell: ({ row }) => {
      const authors = row.getValue("authors") as Author[];
      const label = authors?.length
        ? authors.map((a) => a.name).join(", ")
        : "Не указаны";
      return <div className="text-muted-foreground text-sm">{label}</div>;
    },
  },
];

export function BooksTable({ books }: BooksTableProps) {
  const router = useRouter();

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: books,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-background w-full overflow-hidden rounded-md border">
      <div className="w-full overflow-x-auto">
        <Table className="min-w-[600px] md:min-w-full">
          <colgroup>
            <col className="w-[65%]" />
            <col className="w-[35%]" />
          </colgroup>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => router.push(`/books/${row.original.id}`)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3 align-top">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Нет результатов
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
