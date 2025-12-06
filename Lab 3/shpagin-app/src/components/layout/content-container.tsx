import { ReactNode, Suspense } from "react";

import { cn } from "@/lib/utils";
import { LoadingFallback } from "@/components/loading-fallback";

interface ContentContainerProps {
  title?: string | ReactNode;
  className?: string;
  children?: ReactNode;
}

export function ContentContainer({
  title,
  className,
  children,
}: ContentContainerProps) {
  return (
    <div
      className={cn(
        "container mx-auto flex flex-1 flex-col gap-6 px-4 py-8",
        className,
      )}
    >
      {/* Заголовок */}
      {title && <h1 className="text-4xl font-bold text-wrap">{title}</h1>}

      {/* Контент */}
      <Suspense fallback={<LoadingFallback className="flex-1" />}>
        {children}
      </Suspense>
    </div>
  );
}
