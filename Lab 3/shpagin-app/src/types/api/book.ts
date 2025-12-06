import { Author } from "@/types/api/author";
import { Tag } from "@/types/api/tag";

export interface AgeRating {
  code: string;
  label: string;
}

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

export interface PaginatedResult<T> {
  page: number;
  page_size: number;
  total_count: number;
  total_pages: number;
  has_previous_page: boolean;
  has_next_page: boolean;
  items: T[];
}
