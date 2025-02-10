import { z } from "zod";

export const productSchema = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().positive(),
});

export const createOrderSchema = z.object({
  userId: z.number().int().positive(),
  products: z.array(productSchema).nonempty(), // Debe ser un array con al menos un producto
});
