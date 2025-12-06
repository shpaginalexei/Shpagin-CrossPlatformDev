import { apiClient } from "@/lib/api/client";
import { User } from "@/types/api";
import { UserBook } from "@/types/api/user";

type UserResponse = User;
type UserBookResponse = UserBook;

export const usersApi = {
  findOne: (id: string) =>
    apiClient.get<UserResponse | null>(
      `/users/${id}`,
      { ignoreStatusCodes: [404] },
      true,
    ),

  findBook: (id: string, bookId: string) =>
    apiClient.get<UserBookResponse | null>(
      `/users/${id}/books/${bookId}`,
      { ignoreStatusCodes: [404] },
      true,
    ),
};
