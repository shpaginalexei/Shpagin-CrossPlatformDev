import { Suspense } from "react";

import { booksApi } from "@/lib/api";
import { BooksSearchContent } from "@/components/features/books/content";
import { ContentContainer } from "@/components/layout";
import { LoadingFallback } from "@/components/loading-fallback";

async function BooksSearchContentWrapper({ searchParams }: BooksPageProps) {
  const { search, page, page_size } = await searchParams;
  const currentPage = Number(page) || 1;
  const pageSize = Number(page_size) || 20;

  const booksPromise = booksApi.searchWithPagination({
    page: currentPage,
    pageSize: pageSize,
    include: "tags",
    ...(search ? { query: search } : {}),
  });

  return (
    <ContentContainer
      title={search ? `Результаты по запросу "${search}"` : "Все книги"}
    >
      <Suspense fallback={<LoadingFallback className="flex-1" />}>
        <BooksSearchContent booksPromise={booksPromise} />
      </Suspense>
    </ContentContainer>
  );
}

interface BooksPageProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
    page_size?: string;
  }>;
}

export default async function BooksPage({ searchParams }: BooksPageProps) {
  return (
    <BooksSearchContentWrapper
      searchParams={searchParams}
      key={new Date().toString()}
    />
  );
}
