import { Author } from "@/types/api/author";
import { Tag } from "@/types/api/tag";

export type AgeRating =
  | { value: "ZERO"; label: "0+" }
  | { value: "SIX"; label: "6+" }
  | { value: "TWELVE"; label: "12+" }
  | { value: "SIXTEEN"; label: "16+" }
  | { value: "EIGHTEEN"; label: "18+" };

export const ageRatingValues = [
  "ZERO",
  "SIX",
  "TWELVE",
  "SIXTEEN",
  "EIGHTEEN",
] as const;

export const ageRatingList = [
  { value: "ZERO", label: "0+" },
  { value: "SIX", label: "6+" },
  { value: "TWELVE", label: "12+" },
  { value: "SIXTEEN", label: "16+" },
  { value: "EIGHTEEN", label: "18+" },
] as const;

export interface BookStatistics {
  average_rating: number;
  num_ratings: number;
  in_favorites: number;
  total_readers: number;
  want_to_read: number;
  reading_now: number;
  completed: number;
}

export interface Book {
  id: string;
  name: string;
  year: number | null;
  age_rating: AgeRating | null;
  publisher: string | null;
  annotation: string | null;
  authors: Author[];
  tags: Tag[] | null;
  created_at: string | null;
  updated_at: string | null;
  statistics: BookStatistics | null;
}

export interface BookItem {
  id: string;
  name: string;
  authors: Author[];
}

export interface PaginatedResult<T> {
  page: number;
  page_size: number;
  total_count: number;
  total_pages: number;
  has_previous_page: boolean;
  has_next_page: boolean;
  items: T[];
}
