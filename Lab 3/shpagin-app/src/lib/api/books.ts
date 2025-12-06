import { apiClient } from "@/lib/api/client";
import { Book, PaginatedResult } from "@/types/api";

export interface GetBookQueryParams {
  include?: "details" | "tags" | "details,tags";
  statistics?: boolean;
}

export interface SearchBooksQueryParams extends GetBookQueryParams {
  query?: string;
  authorIds?: string[];
  tagIds?: string[];
  count?: number;
  page: number;
  pageSize: number;
}

export const booksApi = {
  getAll: () => apiClient.get<Book[]>(`/books/all`),

  search: (params: SearchBooksQueryParams) =>
    apiClient.get<PaginatedResult<Book>>(`/books/search`, {
      queryParams: { ...params },
    }),

  findOne: (id: string, params: GetBookQueryParams) =>
    apiClient.get<Book | null>(`/books/${id}`, {
      queryParams: { ...params },
      ignoreStatusCodes: [404],
    }),
};
