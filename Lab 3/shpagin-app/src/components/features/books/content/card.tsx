import Link from "next/link";

// import { FiBookOpen } from "react-icons/fi";
import { BookTags } from "@/components/features/books/details/tags";
// import { BOOK_LOGO_GRADIENT } from "@/lib/constants";
// import { cn } from "@/lib/utils";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Book } from "@/types/api/book";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Link
      href={`/books/${book.id}`}
      className="block transition-transform duration-300 hover:scale-105"
    >
      <Card className="h-60 cursor-pointer flex-row px-6 py-6 shadow-lg transition-shadow md:flex-col md:px-0">
        {/* <div
          data-slot="card-logo"
          className="flex h-full flex-col items-center justify-center md:max-h-75 md:px-6"
        >
          <div
            className={cn(
              "flex aspect-2/3 h-full items-center justify-center rounded-lg",
              BOOK_LOGO_GRADIENT,
            )}
          >
            <FiBookOpen className="text-secondary size-8" />
          </div>
        </div> */}
        <CardContent className="flex flex-col justify-center gap-2 overflow-hidden px-0 md:justify-start md:px-6">
          <CardTitle className="line-clamp-2 text-lg">{book.name}</CardTitle>
          <p className="text-muted-foreground text-sm">
            {book.authors.map((a) => a.name).join(", ")}
          </p>
          <BookTags tags={book.tags} className="mt-6" />
        </CardContent>
      </Card>
    </Link>
  );
}
