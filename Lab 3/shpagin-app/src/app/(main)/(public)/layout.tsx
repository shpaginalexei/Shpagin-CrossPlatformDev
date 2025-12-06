import { PropsWithChildren } from "react";

import { MainContainer } from "@/components/layout";

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return <MainContainer>{children}</MainContainer>;
}
