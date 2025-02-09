import { z } from "zod";
import { createProductSchema } from "../schemas/create-product.schema";

export type CreateProductDto = z.infer<typeof createProductSchema>;
