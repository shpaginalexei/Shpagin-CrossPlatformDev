import { Suspense } from "react";

import { GetUserBooksAction } from "@/lib/actions/api";
import { getUser } from "@/lib/auth/dal";
import { UserBooksTable } from "@/components/features/user/collection";
import { ContentContainer } from "@/components/layout";
import { LoadingFallback } from "@/components/loading-fallback";
import { BookStatus } from "@/types/api";

export async function Collection() {
  const { user } = await getUser();
  if (!user) return null;

  const userBooksResult = await GetUserBooksAction(user.id);
  if (userBooksResult.status === "error") return null;

  const statusOrder: Record<BookStatus, number> = {
    [BookStatus.READING]: 1,
    [BookStatus.WANT_TO_READ]: 2,
    [BookStatus.COMPLETED]: 3,
  };

  const userBooks = userBooksResult.items
    .filter(
      (ub) => ub.favorite !== null || ub.status !== null || ub.rating !== null,
    )
    .sort((a, b) => {
      if (a.status === null) return 1;
      if (b.status === null) return -1;
      return (statusOrder[a.status] || 0) - (statusOrder[b.status] || 0);
    });

  return <UserBooksTable userBooks={userBooks} />;
}

export default async function CollectionPage() {
  return (
    <ContentContainer title="Коллекция">
      <Suspense fallback={<LoadingFallback className="flex-1" />}>
        <Collection />
      </Suspense>
    </ContentContainer>
  );
}
