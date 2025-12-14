import { User, UserBook } from "@/types/api";
import { BookStatus } from "@/types/api";

import { apiClient } from "./client";

interface AddUserBookRequest {
  book_id: string;
  favorite?: boolean | null;
  rating?: number | null;
  status?: BookStatus | null;
}

interface UpdateUserBookPatchRequest {
  favorite?: boolean | null;
  rating?: number | null;
  status?: BookStatus | null;
}

export const usersApi = {
  getAll: () =>
    apiClient.get<User[]>({ endpoint: `/users/all`, isAuthorized: true }),

  findOne: (id: string) =>
    apiClient.get<User | null>({
      endpoint: `/users/${id}`,
      options: { ignoreStatusCodes: [404] },
      isAuthorized: true,
    }),

  getAllBooks: (id: string) =>
    apiClient.get<UserBook[]>({
      endpoint: `/users/${id}/books/all`,
      isAuthorized: true,
    }),

  findBook: (id: string, bookId: string) =>
    apiClient.get<UserBook | null>({
      endpoint: `/users/${id}/books/${bookId}`,
      options: { ignoreStatusCodes: [404] },
      isAuthorized: true,
    }),

  addBook: (id: string, params: AddUserBookRequest) =>
    apiClient.post<UserBook>({
      endpoint: `/users/${id}/books/add`,
      data: { ...params },
      isAuthorized: true,
    }),

  updateBook: (
    id: string,
    bookId: string,
    params: UpdateUserBookPatchRequest,
  ) =>
    apiClient.patch<UserBook>({
      endpoint: `/users/${id}/books/update`,
      data: { ...params },
      options: { queryParams: { bookId: bookId } },
      isAuthorized: true,
    }),
};
