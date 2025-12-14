"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LuPlus } from "react-icons/lu";
import { toast } from "sonner";

import { AddActionResponse } from "@/lib/actions/api";
import { AddBookSchema, bookSchema } from "@/lib/schemas/book";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Author, Book, Tag } from "@/types/api";

import { BookForm } from "./form";

interface AddDialogProps<T> {
  allAuthors: Author[];
  allTags: Tag[];
  addAction: (data: AddBookSchema) => Promise<AddActionResponse<T>>;
}

export function AddDialog({
  allAuthors,
  allTags,
  addAction,
}: AddDialogProps<Book>) {
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState(false);

  const currentYear = new Date().getFullYear();

  const defaultValues: AddBookSchema = {
    name: "",
    year: currentYear,
    age_rating: "ZERO",
    author_ids: [],
    tag_ids: [],
    publisher: null,
    annotation: null,
  };

  const form = useForm<AddBookSchema>({
    resolver: zodResolver(bookSchema),
    mode: "all",
    defaultValues: defaultValues,
  });

  const formAction = async (data: AddBookSchema) => {
    const result = await addAction(data);
    form.reset(defaultValues);
    setFormError(false);
    setOpen(false);
    if (result.status === "error") {
      setFormError(true);
      toast.error(result.message);
    } else {
      setFormError(false);
      toast.success("Изменения применены успешно");
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      form.reset(defaultValues);
      setFormError(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-30">
          <LuPlus /> Добавить
        </Button>
      </DialogTrigger>
      <DialogContent className="no-scrollbar no-scrollbar mb-8 flex max-h-[calc(100vh-10rem)] max-w-[calc(100vw-2rem)] min-w-[calc(100vw-40rem)] flex-col justify-between gap-0 overflow-y-auto p-0">
        <BookForm
          title={"Добавление"}
          allAuthors={allAuthors}
          allTags={allTags}
          form={form}
          formError={formError}
          formAction={formAction}
        />
      </DialogContent>
    </Dialog>
  );
}
