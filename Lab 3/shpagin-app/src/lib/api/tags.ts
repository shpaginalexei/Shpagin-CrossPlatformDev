import { Tag } from "@/types/api";

import { apiClient } from "./client";

export const tagsApi = {
  getAll: () =>
    apiClient.get<Tag[]>({ endpoint: `/tags/all`, isAuthorized: true }),
};
