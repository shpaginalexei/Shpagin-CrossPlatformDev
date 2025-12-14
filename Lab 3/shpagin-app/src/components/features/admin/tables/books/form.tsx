"use client";

import { useTransition } from "react";

import {
  DialogClose,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { UseFormReturn } from "react-hook-form";

import { UpdateBookSchema } from "@/lib/schemas/book";
import { cn } from "@/lib/utils";
import { LoadingFallback } from "@/components/loading-fallback";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Author, Tag } from "@/types/api";

import { AgeRatingPicker } from "./pickers/age-rating-picker";
import { AuthorsPicker } from "./pickers/authors-picker";
import { TagsPicker } from "./pickers/tags-picker";
import { YearPicker } from "./pickers/year-picker";

interface BookFormProps {
  title: string;
  form: UseFormReturn<UpdateBookSchema>;
  formError: boolean;
  allAuthors: Author[];
  allTags: Tag[];
  formAction: (data: UpdateBookSchema) => Promise<void>;
}

export function BookForm({
  title,
  form,
  formError,
  allAuthors,
  allTags,
  formAction,
}: BookFormProps) {
  const [isPending, startTransition] = useTransition();

  const hasErrors = Object.keys(form.formState.errors).length > 0;

  const onSubmit = async (data: UpdateBookSchema) => {
    startTransition(async () => {
      await formAction(data);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <ScrollArea className="flex flex-col justify-between overflow-hidden">
          <DialogHeader className="contents space-y-0 text-left">
            <DialogTitle
              className={cn("px-6 pt-6", formError && "text-destructive")}
            >
              {title}
            </DialogTitle>
            <DialogDescription asChild>
              <div className="p-6">
                <div className="gap-2 space-y-4">
                  {/* Название */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Название</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              value={field.value ?? ""}
                              placeholder="Название"
                              aria-invalid={!!fieldState.error}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Год */}
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Год</FormLabel>
                        <FormControl>
                          <YearPicker
                            {...field}
                            value={field.value}
                            onChange={field.onChange}
                            aria-invalid={!!fieldState.error}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Возрастной рейтинг */}
                  <FormField
                    control={form.control}
                    name="age_rating"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Возрастной рейтинг</FormLabel>
                        <FormControl>
                          <AgeRatingPicker
                            {...field}
                            value={field.value}
                            onChange={field.onChange}
                            aria-invalid={!!fieldState.error}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Авторы */}
                  <FormField
                    control={form.control}
                    name="author_ids"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Авторы</FormLabel>
                        <FormControl>
                          <AuthorsPicker
                            {...field}
                            allAuthors={allAuthors.map((a) => ({
                              value: a.id,
                              label: a.name,
                            }))}
                            value={field.value}
                            onChange={field.onChange}
                            aria-invalid={!!fieldState.error}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Теги */}
                  <FormField
                    control={form.control}
                    name="tag_ids"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Теги</FormLabel>
                        <FormControl>
                          <TagsPicker
                            {...field}
                            allTags={allTags.map((a) => ({
                              value: a.id,
                              label: a.value,
                            }))}
                            value={field.value}
                            onChange={field.onChange}
                            aria-invalid={!!fieldState.error}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Издательство */}
                  <FormField
                    control={form.control}
                    name="publisher"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Издательство</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            value={field.value ?? ""}
                            aria-invalid={!!fieldState.error}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Аннотация */}
                  <FormField
                    control={form.control}
                    name="annotation"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Аннотация</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            value={field.value ?? ""}
                            aria-invalid={!!fieldState.error}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </ScrollArea>
        <DialogFooter className="px-6 pb-6 sm:justify-end">
          <DialogClose asChild>
            <Button variant="outline">Отмена</Button>
          </DialogClose>
          <Button type="submit" disabled={isPending || hasErrors || formError}>
            {isPending ? <LoadingFallback /> : "Применить"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
