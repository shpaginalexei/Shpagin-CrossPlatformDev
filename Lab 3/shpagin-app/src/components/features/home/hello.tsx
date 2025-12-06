"use client";

import { use } from "react";
import Link from "next/link";

import { LuArrowRight, LuBook } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import { Book } from "@/types/api";

interface HelloContentProps {
  booksPromise: Promise<Book[]>;
}

export function HelloContent({ booksPromise }: HelloContentProps) {
  const books = use(booksPromise);

  const booksCount = books.length;
  const authorsCount = new Set(
    books.flatMap((book) => book.authors.map((author) => author.id)),
  ).size;

  return (
    <section
      role="main"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden"
    >
      {/* Градиентный фон */}

      {/* Декоративные элементы */}
      <div className="absolute top-20 right-10 size-72 animate-pulse rounded-full bg-orange-500/50 opacity-20 blur-3xl" />
      <div className="absolute bottom-30 left-10 size-100 animate-pulse rounded-full bg-emerald-500/50 opacity-20 blur-3xl" />
      <div className="absolute -bottom-32 left-0 h-96 w-96 rounded-full bg-teal-500/10 opacity-30 blur-3xl" />

      {/* Основной контент */}
      <div className="relative container mx-auto px-6 py-32 md:py-48">
        <div className="mx-auto max-w-3xl space-y-8 text-center">
          {/* Иконка и префикс */}
          <div className="border-primary/30 bg-primary/5 inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm">
            <LuBook className="text-primary h-4 w-4" />
            <span className="text-primary text-sm font-medium">
              Откройте мир литературы
            </span>
          </div>

          {/* Заголовок */}
          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
            <span className="from-foreground via-primary to-primary/80 bg-linear-to-r bg-clip-text text-transparent">
              Исследуйте, Читайте, Растите
            </span>
          </h1>

          {/* Подзаголовок */}
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed md:text-xl">
            Найдите вдохновляющие книги, исследуйте рекомендации и создавайте
            свою коллекцию с легкостью. Присоединяйтесь к нашему сообществу
            читателей сегодня.
          </p>

          {/* Кнопка */}
          <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
            <Link href="/books">
              <Button
                size="lg"
                className="group h-12 px-8 text-base font-semibold shadow-lg transition-all hover:shadow-xl"
              >
                Начать исследование
                <LuArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Статистика */}
          <div className="border-border/50 grid grid-cols-2 gap-6 border-t pt-12">
            <div className="space-y-2">
              <p className="text-primary text-3xl font-bold md:text-4xl">
                {booksCount}
              </p>
              <p className="text-muted-foreground text-sm">Книг в каталоге</p>
            </div>
            <div className="space-y-2">
              <p className="text-primary text-3xl font-bold md:text-4xl">
                {authorsCount}
              </p>
              <p className="text-muted-foreground text-sm">Авторов</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
