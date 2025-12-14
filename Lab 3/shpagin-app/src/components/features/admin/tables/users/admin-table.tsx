import { GetUsersAction } from "@/lib/actions/api";

import { UsersTable } from "./table";

export async function UsersAdminTable() {
  const usersResult = await GetUsersAction();

  if (usersResult.status === "error") {
    return null;
  }

  const users = usersResult.items;

  return (
    <div className="flex w-full flex-col gap-3">
      <UsersTable users={users} />
      <p className="text-muted-foreground text-sm">Всего: {users.length}</p>
    </div>
  );
}
