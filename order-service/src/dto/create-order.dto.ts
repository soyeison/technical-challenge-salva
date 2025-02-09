import { z } from "zod";
import {
  createOrderSchema,
  productSchema,
} from "../schemas/create-order.schema";

export type CreateOrderDto = z.infer<typeof createOrderSchema>;

export type CreateOrderProductsDto = z.infer<typeof productSchema>;
