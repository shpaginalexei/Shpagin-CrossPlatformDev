"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LuPencil } from "react-icons/lu";
import { toast } from "sonner";

import { EditActionResponse } from "@/lib/actions/api";
import { bookSchema, UpdateBookSchema } from "@/lib/schemas/book";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Author, Book, Tag } from "@/types/api";

import { BookForm } from "./form";

interface EditDialogProps<T> {
  book: Book;
  allAuthors: Author[];
  allTags: Tag[];
  updateAction: (data: UpdateBookSchema) => Promise<EditActionResponse<T>>;
}

export function EditDialog({
  book,
  allAuthors,
  allTags,
  updateAction,
}: EditDialogProps<Book>) {
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState(false);

  const defaultValues: UpdateBookSchema = {
    name: book.name,
    year: book.year,
    age_rating: book.age_rating!.value,
    author_ids: book.authors.map((a) => a.id),
    tag_ids: book.tags?.map((t) => t.id) || [],
    publisher: book.publisher,
    annotation: book.annotation,
  };

  const form = useForm<UpdateBookSchema>({
    resolver: zodResolver(bookSchema),
    mode: "all",
    defaultValues: defaultValues,
  });

  const formAction = async (data: UpdateBookSchema) => {
    const result = await updateAction(data);
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
        <Button variant="ghost" size="icon">
          <LuPencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="no-scrollbar no-scrollbar mb-8 flex max-h-[calc(100vh-10rem)] max-w-[calc(100vw-2rem)] min-w-[calc(100vw-40rem)] flex-col justify-between gap-0 overflow-y-auto p-0">
        <BookForm
          title={"Редактирование"}
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
