import { z } from "zod";

import { ageRatingValues } from "@/types/api";

export const bookSchema = z.object({
  name: z
    .string()
    .min(1, "Название обязательно")
    .max(255, "Название не может быть длиннее 255 символов"),

  year: z
    .number()
    .int("Год должен быть целым числом")
    .gte(1000, "Год должен быть не меньше 1000")
    .nullable(),

  age_rating: z.enum(ageRatingValues),

  author_ids: z
    .array(z.guid("Некорректный идентификатор автора"))
    .min(1, "Нужно указать хотя бы одного автора"),

  tag_ids: z.array(z.guid("Некорректный идентификатор автора")),

  publisher: z
    .string()
    .max(255, "Издатель не может быть длиннее 255 символов")
    .nullable(),

  annotation: z
    .string()
    .max(1023, "Аннотация не может быть длиннее 1023 символов")
    .nullable(),
});

export type UpdateBookSchema = z.infer<typeof bookSchema>;
export type AddBookSchema = z.infer<typeof bookSchema>;
