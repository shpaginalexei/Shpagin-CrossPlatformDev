import { Suspense } from "react";

import { booksApi } from "@/lib/api/books";
import { HelloContent } from "@/components/features/home";
import { LoadingFallback } from "@/components/loading-fallback";

export default function HomePage() {
  const booksPromise = booksApi.getAll();

  return (
    <Suspense fallback={<LoadingFallback className="min-h-screen flex-1" />}>
      <HelloContent booksPromise={booksPromise} />
    </Suspense>
  );
}
