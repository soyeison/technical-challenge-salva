import express from "express";
import { validateId } from "../middleware/validate-id";
import { validateBody } from "../middleware/validate-body";
import { createUserSchema } from "../schemas/create-user.schema";
import { updateUserSchema } from "../schemas/update-user.schema";
import { validateQuery } from "../middleware/validate-query";
import { emailQuerySchema } from "../schemas/email.schema";
import { paginateSchema } from "../schemas/paginate.schema";
import { UserController } from "../controller/user.controller";
import { signInSchema } from "../schemas/sign-in.schema";
import { AuthController } from "../controller/auth.controller";

const router = express.Router();

const authController = new AuthController();

router.post("/sign-in", validateBody(signInSchema), authController.signIn);
router.post("/sign-up", validateBody(createUserSchema), authController.signUp);

export { router as authRouter };
