import { getAccessToken } from "@/lib/auth/session";
import { API_BASE_URL } from "@/lib/constants";
import { ApiError, ErrorCode, IApiError } from "@/types/api/error";

export type RequestOptions = RequestInit & {
  queryParams?: Record<string, string | string[] | number | boolean>;
  ignoreStatusCodes?: number[]; // FIXME
};

async function apiRequest<T>(
  endpoint: string,
  isAuthorized: boolean,
  options: RequestOptions,
): Promise<T> {
  // await new Promise((resolve) => setTimeout(resolve, 3000)); // for tests

  let url = `${API_BASE_URL}/api${endpoint}`;

  const { queryParams, ...fetchOptions } = options;

  // Формирование query параметров
  if (queryParams) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(queryParams)) {
      params.append(key, String(value));
    }
    url += `?${params.toString()}`;
  }

  // Формирование заголовков
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (isAuthorized) {
    const token = await getAccessToken();
    if (token) {
      defaultHeaders["Authorization"] = `Bearer ${token}`;
    }
  }

  const config: RequestInit = {
    ...fetchOptions,
    headers: {
      ...defaultHeaders,
      ...fetchOptions.headers,
    },
  };

  let response: Response;

  console.log("API Request URL:", url, config);

  try {
    response = await fetch(url, config);
  } catch (error) {
    if (error instanceof Error) {
      console.error("[API Network Error]", error);
      throw new Error("Сервер недоступен. Проверьте подключение к интернету.");
    }
    throw error;
  }

  let data = null;
  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");

  try {
    if (isJson) {
      const text = await response.text();
      data = text ? JSON.parse(text) : null;
    } else {
      data = null;
    }
  } catch (e) {
    console.error("[API Parse Error]", e);
  }

  if (!response.ok) {
    if (options.ignoreStatusCodes?.includes(response.status)) {
      return null as T;
    }

    const errorBody = data as IApiError | null;

    console.warn("[API Error Response]", {
      status: response.status,
      url,
      errorBody,
    });

    if (errorBody?.status && errorBody?.error) {
      throw new ApiError(
        errorBody.status,
        errorBody.error,
        errorBody.message || response.statusText,
        errorBody.details,
      );
    }

    throw new ApiError(
      response.status,
      mapStatusToErrorCode(response.status),
      response.statusText || `HTTP Error ${response.status}`,
      { raw: data },
    );
  }

  return data as T;
}

function mapStatusToErrorCode(status: number): ErrorCode {
  switch (status) {
    case 401:
      return ErrorCode.UNAUTHORIZED;
    case 403:
      return ErrorCode.FORBIDDEN;
    case 404:
      return ErrorCode.NOT_FOUND;
    case 422:
      return ErrorCode.VALIDATION_ERROR;
    case 500:
      return ErrorCode.INTERNAL_SERVER_ERROR;
    default:
      return ErrorCode.INTERNAL_SERVER_ERROR;
  }
}

export const apiClient = {
  get: <T>({
    endpoint,
    options,
    isAuthorized = true,
  }: {
    endpoint: string;
    options?: RequestOptions;
    isAuthorized: boolean;
  }) => apiRequest<T>(endpoint, isAuthorized, { method: "GET", ...options }),

  post: <T>({
    endpoint,
    data,
    options,
    isAuthorized = true,
  }: {
    endpoint: string;
    data: unknown;
    options?: RequestOptions;
    isAuthorized: boolean;
  }) =>
    apiRequest<T>(endpoint, isAuthorized, {
      method: "POST",
      body: JSON.stringify(data),
      ...options,
    }),

  patch: <T>({
    endpoint,
    data,
    options,
    isAuthorized = true,
  }: {
    endpoint: string;
    data: unknown;
    options?: RequestOptions;
    isAuthorized: boolean;
  }) =>
    apiRequest<T>(endpoint, isAuthorized, {
      method: "PATCH",
      body: JSON.stringify(data),
      ...options,
    }),

  put: <T>({
    endpoint,
    data,
    options,
    isAuthorized = true,
  }: {
    endpoint: string;
    data: unknown;
    options?: RequestOptions;
    isAuthorized: boolean;
  }) =>
    apiRequest<T>(endpoint, isAuthorized, {
      method: "PUT",
      body: JSON.stringify(data),
      ...options,
    }),

  delete: <T>({
    endpoint,
    options,
    isAuthorized = true,
  }: {
    endpoint: string;
    options?: RequestOptions;
    isAuthorized: boolean;
  }) => apiRequest<T>(endpoint, isAuthorized, { method: "DELETE", ...options }),
};
