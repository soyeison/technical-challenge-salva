import { z } from "zod";
import { createProductSchema } from "../schemas/create-product.schema";

export type UpdateProductDto = z.infer<typeof createProductSchema>;
