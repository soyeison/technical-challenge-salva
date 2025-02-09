import express, { Request, Response } from "express";
import { AuthController } from "../controller/auth.controller";
import { AuthService } from "../service/auth.service";
import { validateBody } from "../middleware/validate-body";
import { createUserSchema } from "../schemas/create-user.schema";
import { signInSchema } from "../schemas/sign-in.schema";

const router = express.Router();

const authService = new AuthService();
const authController = new AuthController(authService);

router.post("/sign-in", validateBody(signInSchema), authController.signIn);
router.post("/sign-up", validateBody(createUserSchema), authController.signUp);

export { router as authRouter };
