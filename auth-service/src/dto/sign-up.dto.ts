import { z } from "zod";
import { createUserSchema } from "../schemas/create-user.schema";

export type SignUpDto = z.infer<typeof createUserSchema>;
