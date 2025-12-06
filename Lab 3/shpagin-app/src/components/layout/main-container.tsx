import { PropsWithChildren } from "react";

export function MainContainer({ children }: PropsWithChildren<unknown>) {
  return (
    <main
      role="main"
      className="container mx-auto flex min-h-screen flex-col items-center justify-center gap-3 p-6 pt-6"
    >
      {children}
    </main>
  );
}
