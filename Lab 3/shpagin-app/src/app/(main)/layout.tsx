import { PropsWithChildren } from "react";

import { Footer, Header } from "@/components/layout";
import { AuthProvider } from "@/components/providers";

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <AuthProvider>
      <Header />
      {children}
      <Footer />
    </AuthProvider>
  );
}
