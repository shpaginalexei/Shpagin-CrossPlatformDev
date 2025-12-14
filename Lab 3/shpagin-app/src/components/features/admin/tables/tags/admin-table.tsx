import { GetTagsAction } from "@/lib/actions/api";

import { TagsTable } from "./table";

export async function TagsAdminTable() {
  const tagsResult = await GetTagsAction();

  if (tagsResult.status === "error") {
    return null;
  }

  const tags = tagsResult.items;

  return (
    <div className="flex w-full flex-col gap-3">
      <TagsTable tags={tags} />
      <p className="text-muted-foreground text-sm">Всего: {tags.length}</p>
    </div>
  );
}
