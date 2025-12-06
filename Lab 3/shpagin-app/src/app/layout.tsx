import { JetBrains_Mono, Nunito } from "next/font/google";

import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

import { Toaster } from "@/components/ui/sonner";

import "@/styles/globals.css";

const fontSans = Nunito({
  variable: "--font-nunito",
  display: "swap",
  subsets: ["cyrillic"],
});

const fontMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  display: "swap",
  subsets: ["cyrillic"],
});

export const metadata: Metadata = {
  title: "NextBook",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
    ],
  },
  description: "Сайт с книгами",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          {children}
        </ThemeProvider>
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
