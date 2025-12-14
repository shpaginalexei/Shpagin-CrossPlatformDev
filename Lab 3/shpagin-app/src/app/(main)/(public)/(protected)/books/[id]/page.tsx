import { Suspense } from "react";

import { booksApi, usersApi } from "@/lib/api";
import { getUser } from "@/lib/auth/dal";
import { BackButton } from "@/components/back-button";
import { BookContent } from "@/components/features/books/details";
import { ContentContainer } from "@/components/layout";
import { LoadingFallback } from "@/components/loading-fallback";
import { Book } from "@/types/api";

interface ContentProps {
  bookId: string;
  bookPromise: Promise<Book | null>;
}

async function BookContentWrapper({ bookId, bookPromise }: ContentProps) {
  const { user } = await getUser(); // FIXME
  if (!user) return null;

  const userBookPromise = usersApi.findBook(user.id, bookId);

  return (
    <Suspense fallback={<LoadingFallback className="flex-1" />}>
      <BookContent
        bookPromise={bookPromise}
        userId={user.id}
        userBookPromise={userBookPromise}
      />
    </Suspense>
  );
}

interface BookPageProps {
  params: Promise<{ id: string }>;
}

export default async function BookPage({ params }: BookPageProps) {
  const { id } = await params;

  const bookPromise = booksApi.findOne(id, {
    include: "details,tags",
    statistics: true,
  });

  return (
    <ContentContainer>
      <BackButton />
      <div className="flex flex-1 flex-col">
        <Suspense fallback={<LoadingFallback className="flex-1" />}>
          <BookContentWrapper bookId={id} bookPromise={bookPromise} />
        </Suspense>
      </div>
    </ContentContainer>
  );
}
