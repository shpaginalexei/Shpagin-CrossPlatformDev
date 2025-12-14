import { GetAuthorsAction } from "@/lib/actions/api";

import { AuthorsTable } from "./table";

export async function AuthorsAdminTable() {
  const authorsResult = await GetAuthorsAction();

  if (authorsResult.status === "error") {
    return null;
  }

  const authors = authorsResult.items;

  return (
    <div className="flex w-full flex-col gap-3">
      <AuthorsTable authors={authors} />
      <p className="text-muted-foreground text-sm">Всего: {authors.length}</p>
    </div>
  );
}
