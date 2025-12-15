"use server";

import { revalidatePath } from "next/cache";

import { authorsApi, booksApi, tagsApi, usersApi } from "@/lib/api";
import { UpdateUserPatchRequest } from "@/lib/api/user";
import { AddBookSchema, UpdateBookSchema } from "@/lib/schemas/book";
import {
  Author,
  Book,
  BookStatus,
  Tag,
  TranslateStatus,
  User,
  UserBook,
} from "@/types/api";
import { ApiError, ErrorCode } from "@/types/api/error";

export type GetListActionResponse<T> =
  | {
      status: "success";
      items: T[];
    }
  | {
      status: "error";
      error: ErrorCode;
      message?: string;
    };

export type AddActionResponse<T> =
  | {
      status: "success";
      item: T;
    }
  | {
      status: "error";
      error: ErrorCode;
      message?: string;
    };

export type EditActionResponse<T> = AddActionResponse<T>;

export type DeleteActionResponse =
  | {
      status: "success";
      message: string;
    }
  | {
      status: "error";
      error: ErrorCode;
      message?: string;
    };

const handleApiError = (
  error: unknown,
): { error: ErrorCode; message: string } => {
  if (error instanceof ApiError) {
    if (error.details) {
      return {
        error: error.error,
        message: error.message + JSON.stringify(error.details, null, 2),
      };
    }
    return {
      error: error.error,
      message: error.message,
    };
  }
  return {
    error: ErrorCode.INTERNAL_SERVER_ERROR,
    message: "Произошла непредвиденная ошибка",
  };
};

export async function GetBooksAction(): Promise<GetListActionResponse<Book>> {
  try {
    const books = await booksApi.search({ include: "details,tags" });
    return { status: "success", items: books };
  } catch (error) {
    return { status: "error", ...handleApiError(error) };
  }
}

export async function GetUsersAction(): Promise<GetListActionResponse<User>> {
  try {
    const users = await usersApi.getAll();
    return { status: "success", items: users };
  } catch (error) {
    return { status: "error", ...handleApiError(error) };
  }
}

export async function GetAuthorsAction(): Promise<
  GetListActionResponse<Author>
> {
  try {
    const authors = await authorsApi.getAll();
    return { status: "success", items: authors };
  } catch (error) {
    return { status: "error", ...handleApiError(error) };
  }
}

export async function GetTagsAction(): Promise<GetListActionResponse<Tag>> {
  try {
    const tags = await tagsApi.getAll();
    return { status: "success", items: tags };
  } catch (error) {
    return { status: "error", ...handleApiError(error) };
  }
}

export async function GetUserBooksAction(
  id: string,
): Promise<GetListActionResponse<UserBook>> {
  try {
    const userBooks = await usersApi.getAllBooks(id);
    return { status: "success", items: userBooks };
  } catch (error) {
    return { status: "error", ...handleApiError(error) };
  }
}

export async function AddBookAction(
  schema: AddBookSchema,
): Promise<AddActionResponse<Book>> {
  try {
    const book = await booksApi.create(schema);
    revalidatePath("/admin/panel");
    return {
      status: "success",
      item: book,
    };
  } catch (error) {
    return { status: "error", ...handleApiError(error) };
  }
}

export async function UpdateBookAction(
  bookId: string,
  schema: UpdateBookSchema,
): Promise<EditActionResponse<Book>> {
  try {
    const book = await booksApi.update(bookId, schema);
    revalidatePath("/admin/panel");
    return {
      status: "success",
      item: book,
    };
  } catch (error) {
    return { status: "error", ...handleApiError(error) };
  }
}

export async function UpdateUserAction(
  userId: string,
  schema: UpdateUserPatchRequest,
): Promise<EditActionResponse<User>> {
  try {
    const user = await usersApi.update(userId, schema);
    revalidatePath("/admin/panel");
    return {
      status: "success",
      item: user,
    };
  } catch (error) {
    return { status: "error", ...handleApiError(error) };
  }
}

export async function DeleteBookAction(
  bookId: string,
): Promise<DeleteActionResponse> {
  try {
    await booksApi.delete(bookId);

    revalidatePath("/admin/panel");

    return {
      status: "success",
      message: "Книга удалена успешно!",
    };
  } catch (error) {
    return { status: "error", ...handleApiError(error) };
  }
}

export type SetActionResponse =
  | {
      status: "success";
      message: string;
    }
  | {
      status: "error";
      error: ErrorCode;
      message?: string;
    };

export async function SetLikeAction(
  userId: string,
  bookId: string,
  isLiked: boolean,
): Promise<SetActionResponse> {
  try {
    let userBook = await usersApi.findBook(userId, bookId);

    if (!userBook) {
      userBook = await usersApi.addBook(userId, {
        book_id: bookId,
        favorite: isLiked,
      });
    } else {
      userBook = await usersApi.updateBook(userId, bookId, {
        favorite: isLiked,
        rating: userBook.rating,
        status: userBook.status,
      });
    }

    if (userBook.favorite === null)
      return {
        status: "error",
        error: ErrorCode.INTERNAL_SERVER_ERROR,
      };

    revalidatePath(`/books/${bookId}`);

    return {
      status: "success",
      message: userBook.favorite
        ? "Добавлено в избранное"
        : "Удалено из избранного",
    };
  } catch (error) {
    return { status: "error", ...handleApiError(error) };
  }
}

export async function SetStatusAction(
  userId: string,
  bookId: string,
  status: BookStatus | null,
): Promise<SetActionResponse> {
  try {
    let userBook = await usersApi.findBook(userId, bookId);

    if (!userBook) {
      userBook = await usersApi.addBook(userId, {
        book_id: bookId,
        status: status,
      });
    } else {
      userBook = await usersApi.updateBook(userId, bookId, {
        favorite: userBook.favorite,
        rating: userBook.rating,
        status: status,
      });
    }

    revalidatePath(`/books/${bookId}`);

    return {
      status: "success",
      message: userBook.status
        ? `Добавлено в коллекцию "${TranslateStatus(userBook.status)}"`
        : `Удалено из коллекции`,
    };
  } catch (error) {
    return { status: "error", ...handleApiError(error) };
  }
}

export async function SetRatingAction(
  userId: string,
  bookId: string,
  rating: number | null,
): Promise<SetActionResponse> {
  try {
    let userBook = await usersApi.findBook(userId, bookId);

    if (!userBook) {
      userBook = await usersApi.addBook(userId, {
        book_id: bookId,
        rating: rating,
      });
    } else {
      userBook = await usersApi.updateBook(userId, bookId, {
        favorite: userBook.favorite,
        rating: rating,
        status: userBook.status,
      });
    }

    revalidatePath(`/books/${bookId}`);

    return {
      status: "success",
      message: userBook.status ? `Добавлена оценка` : `Оценка удалена`,
    };
  } catch (error) {
    return { status: "error", ...handleApiError(error) };
  }
}
