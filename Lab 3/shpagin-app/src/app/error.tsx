"use client";

import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";

import { LoadingFallback } from "@/components/loading-fallback";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    console.error("_Error:", error);
  }, [error]);

  const handleRetry = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-7xl font-bold">500</h1>
      <p className="text-muted-foreground mb-6">Internal Server Error</p>
      <Button
        variant="link"
        onClick={handleRetry}
        disabled={isPending}
        className="text-sm hover:underline"
      >
        {isPending ? <LoadingFallback /> : "Try again"}
      </Button>
    </div>
  );
}
