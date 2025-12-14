import { Author } from "@/types/api";

import { apiClient } from "./client";

export const authorsApi = {
  getAll: () =>
    apiClient.get<Author[]>({ endpoint: `/authors/all`, isAuthorized: true }),
};
