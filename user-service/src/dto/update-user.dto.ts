import { z } from "zod";
import { updateUserSchema } from "../schemas/update-user.schema";

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
