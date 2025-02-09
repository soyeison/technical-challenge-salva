import { z } from "zod";
import { signInSchema } from "../schemas/sign-in.schema";

export type SignInDto = z.infer<typeof signInSchema>;
