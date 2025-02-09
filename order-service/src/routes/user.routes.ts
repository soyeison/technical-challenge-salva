import express from "express";
import { AppDataSource } from "../data-source";
import { validateBody } from "../middleware/validate-body";
import { UserRepository } from "../repository/user.repository";
import { User } from "../entity/user.entity";
import { UserService } from "../service/user.service";
import { UserController } from "../controller/user.controller";
import { createUserSchema } from "../schemas/create-user.schema";

const router = express.Router();

const userRepository = new UserRepository(AppDataSource.getRepository(User));
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post("/", validateBody(createUserSchema), userController.create);

export { router as userRouter };
