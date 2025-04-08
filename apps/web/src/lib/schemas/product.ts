import { z } from "zod"

export const productSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Name is too long"),
  description: z.string().min(1, "Description is required").max(500, "Description is too long"),
  price: z.number().min(0, "Price must be positive").max(1000000, "Price is too high"),
  stock: z.number().int().min(0, "Stock must be positive").max(1000000, "Stock is too high"),
  category: z.string().min(1, "Category is required").max(50, "Category is too long"),
})

export type ProductFormData = z.infer<typeof productSchema> 