import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

export interface LoadingFallbackProps {
  className?: string;
}

export function LoadingFallback({ className }: LoadingFallbackProps) {
  return (
    <p className={cn(className, "flex items-center justify-center")}>
      <Spinner className="text-muted-foreground size-6" />
    </p>
  );
}
