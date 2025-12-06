import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-7xl font-bold">404</h1>
      <p className="text-muted-foreground mb-6">
        This page doesn&apos;t exist.
      </p>
      <Link href="/" className="text-sm hover:underline">
        Back to Home
      </Link>
    </div>
  );
}
