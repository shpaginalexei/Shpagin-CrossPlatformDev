"use client";

import { useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import z, { ZodObject } from "zod";

import { EditActionResponse } from "@/lib/actions/api";
import { MIN_DATE } from "@/lib/constants";
import { LoadingFallback } from "@/components/loading-fallback";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface EditOneElementDialogProps<T, TT> {
  text?: string;
  title: string;
  label: string;
  valueSchema: ZodObject;
  defaultValues: T;
  updateAction: (data: T) => Promise<EditActionResponse<TT>>;
  type?: "string" | "date" | "email" | "password";
}

export function EditOneElementDialog<T, TT>({
  text,
  title,
  label,
  valueSchema,
  defaultValues,
  updateAction,
  type,
}: EditOneElementDialogProps<T, TT>) {
  const [open, setOpen] = useState(false);
  const [, setFormError] = useState(false);
  const [isPending, startTransition] = useTransition();

  type Schema = z.infer<typeof valueSchema>;

  const form = useForm<Schema>({
    resolver: zodResolver(valueSchema),
    mode: "all",
    defaultValues: defaultValues as DefaultValues<Schema>,
  });

  const hasErrors = Object.keys(form.formState.errors).length > 0;
  const today = new Date().toISOString().split("T")[0];

  const onSubmit = async (data: Schema) => {
    startTransition(async () => {
      const result = await updateAction(data as T);
      setFormError(false);
      setOpen(false);

      if (result.status === "error") {
        setFormError(true);
        toast.error(result.message || "Ошибка при обновлении данных");
      } else {
        setFormError(false);
        toast.success("Данные успешно обновлены");
      }
    });
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      form.reset(defaultValues as DefaultValues<Schema>);
      setFormError(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <p className="text-md text-blue-400 hover:cursor-pointer hover:text-blue-500">
          {text || "Изменить"}
        </p>
      </DialogTrigger>
      <DialogContent className="bg-card sm:max-w-lg">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl">{title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-6"
          >
            <div className="grid grow gap-3">
              <FormField
                control={form.control}
                name="value"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={type}
                          step={type === "date" ? "1" : undefined}
                          min={type === "date" ? String(MIN_DATE) : undefined}
                          max={type === "date" ? today : undefined}
                          className={
                            type === "date"
                              ? "appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                              : ""
                          }
                          value={
                            typeof field.value === "string" ? field.value : ""
                          }
                          placeholder={label}
                          aria-invalid={!!fieldState.error}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="self-end"
              disabled={isPending || hasErrors}
            >
              {isPending ? <LoadingFallback /> : "Изменить"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
