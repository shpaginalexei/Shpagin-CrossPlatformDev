import { AddBookSchema, UpdateBookSchema } from "@/lib/schemas/book";
import { Book, BookItem, PaginatedResult } from "@/types/api";

import { apiClient } from "./client";

interface GetBookParams {
  include?: "details" | "tags" | "details,tags";
  statistics?: boolean;
}

interface SearchBooksParams extends GetBookParams {
  query?: string;
  authorIds?: string[];
  tagIds?: string[];
  count?: number;
}

export interface PaginationRequest {
  page: number;
  pageSize: number;
}

type SearchBooksWithPagination = SearchBooksParams & PaginationRequest;

type UpdateBookRequest = UpdateBookSchema;
type AddBookRequest = AddBookSchema;

export const booksApi = {
  getAll: () =>
    apiClient.get<BookItem[]>({ endpoint: `/books/all`, isAuthorized: false }),

  search: (params?: SearchBooksParams) =>
    apiClient.get<Book[]>({
      endpoint: `/books/search`,
      options: {
        queryParams: { ...params },
      },
      isAuthorized: true,
    }),

  searchWithPagination: (params: SearchBooksWithPagination) =>
    apiClient.get<PaginatedResult<Book>>({
      endpoint: `/books/search`,
      options: {
        queryParams: { ...params },
      },
      isAuthorized: true,
    }),

  findOne: (id: string, params?: GetBookParams) =>
    apiClient.get<Book | null>({
      endpoint: `/books/${id}`,
      options: {
        queryParams: { ...params },
        ignoreStatusCodes: [404],
      },
      isAuthorized: true,
    }),

  create: (params: AddBookRequest) =>
    apiClient.post<Book>({
      endpoint: `/books/create`,
      data: { ...params },
      isAuthorized: true,
    }),

  update: (id: string, params: UpdateBookRequest) =>
    apiClient.put<Book>({
      endpoint: `/books/update`,
      data: { ...params },
      options: { queryParams: { id: id } },
      isAuthorized: true,
    }),

  delete: (id: string) =>
    apiClient.delete<null>({
      endpoint: `/books/delete`,
      options: { queryParams: { id: id } },
      isAuthorized: true,
    }),
};
