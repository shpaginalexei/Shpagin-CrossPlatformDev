import { Suspense } from "react";

import { LoadingFallback } from "@/components/loading-fallback";

import {
  AuthorsAdminTable,
  BooksAdminTable,
  TagsAdminTable,
  UsersAdminTable,
} from "./tables";
import { TabsContainer } from "./tabs-container";

const tabs = [
  {
    name: "Пользователи",
    value: "users",
    content: (
      <Suspense fallback={<LoadingFallback className="flex-1" />}>
        <UsersAdminTable />
      </Suspense>
    ),
  },
  {
    name: "Книги",
    value: "books",
    content: (
      <Suspense fallback={<LoadingFallback className="flex-1" />}>
        <BooksAdminTable />
      </Suspense>
    ),
  },
  {
    name: "Авторы",
    value: "authors",
    content: (
      <Suspense fallback={<LoadingFallback className="flex-1" />}>
        <AuthorsAdminTable />
      </Suspense>
    ),
  },
  {
    name: "Теги",
    value: "tags",
    content: (
      <Suspense fallback={<LoadingFallback className="flex-1" />}>
        <TagsAdminTable />
      </Suspense>
    ),
  },
];

export function AdminPanelContent() {
  return <TabsContainer tabs={tabs} defaultValue="books" />;
}
