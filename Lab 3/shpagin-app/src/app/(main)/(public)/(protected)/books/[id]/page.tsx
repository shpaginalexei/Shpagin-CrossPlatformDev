import { Suspense } from "react";

import { booksApi } from "@/lib/api/books";
import { usersApi } from "@/lib/api/user";
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
  const { user } = await getUser();

  const userBookPromise = user
    ? usersApi.findBook(user.id, bookId)
    : Promise.resolve(null);

  return (
    <Suspense fallback={<LoadingFallback className="flex-1" />}>
      <BookContent
        bookPromise={bookPromise}
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
