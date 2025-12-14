import {
  GetAuthorsAction,
  GetBooksAction,
  GetTagsAction,
} from "@/lib/actions/api";

import { BooksTable } from "./table";

export async function BooksAdminTable() {
  const [booksResult, authorsResult, tagsResult] = await Promise.all([
    GetBooksAction(),
    GetAuthorsAction(),
    GetTagsAction(),
  ]);

  if (
    booksResult.status === "error" ||
    authorsResult.status === "error" ||
    tagsResult.status == "error"
  ) {
    return null;
  }

  const books = booksResult.items;
  const authors = authorsResult.items;
  const tags = tagsResult.items;

  return (
    <div className="flex w-full flex-col gap-3">
      <BooksTable books={books} authors={authors} tags={tags} />
      <p className="text-muted-foreground text-sm">Всего: {books.length}</p>
    </div>
  );
}
