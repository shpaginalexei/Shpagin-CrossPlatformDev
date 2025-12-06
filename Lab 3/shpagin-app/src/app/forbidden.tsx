import Link from "next/link";

export default function Forbidden() {
  return (
    <div className="flex h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-7xl font-bold">403</h1>
      <p className="text-muted-foreground mb-6">
        You don&apos;t have permission to access
      </p>
      <Link href="/" className="text-sm hover:underline">
        Back to Home
      </Link>
    </div>
  );
}
