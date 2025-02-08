import { createUserSchema } from "./create-user.schema";

export const updateUserSchema = createUserSchema.partial();
