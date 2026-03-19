import { z } from "zod";

export const productFormSchema = z.object({
  title: z.string().min(1, "Наименование обязательно"),
  price: z.number().min(0, "Цена должна быть положительной"),
  vendor: z.string().min(1, "Вендор обязателен"),
  sku: z.string().min(1, "Артикул обязателен"),
});

export type ProductFormData = z.infer<typeof productFormSchema>;

