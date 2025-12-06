export enum ErrorCode {
  UNAUTHORIZED = "UNAUTHORIZED",
  NOT_FOUND = "NOT_FOUND",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  DATABASE_ERROR = "DATABASE_ERROR",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

export enum NotFoundTarget {
  author = "author",
  tag = "tag",
  book = "book",
  user = "user",
  user_book = "user_book",
}

export enum ValidationErrorField {
  user_name = "user_name",
  email = "email",
  author_ids = "author_ids",
  tag_ids = "tag_ids",
}

export interface NotFoundByIdDetails {
  target: NotFoundTarget;
  id: string;
}

export interface NotFoundByNameDetails {
  target: NotFoundTarget;
  name: string;
}

export interface NotFoundUserBookRelationDetails {
  target: NotFoundTarget;
  userId: string;
  bookId: string;
}

export interface ValidationErrorDetails {
  field: ValidationErrorField | string;
  message: string;
}

export type IApiErrorDetails =
  | NotFoundByIdDetails
  | NotFoundByNameDetails
  | NotFoundUserBookRelationDetails
  | ValidationErrorDetails
  | ValidationErrorDetails[];

export interface IApiError {
  status: number;
  error: ErrorCode;
  message: string;
  details?: IApiErrorDetails | unknown;
}

export class ApiError extends Error implements IApiError {
  status: number;
  error: ErrorCode;
  details?: IApiErrorDetails | unknown;

  constructor(
    status: number,
    error: ErrorCode,
    message: string,
    details?: IApiErrorDetails | unknown,
  ) {
    super(message);
    this.name = "AppError";
    this.status = status;
    this.error = error;
    this.details = details;
  }
}
