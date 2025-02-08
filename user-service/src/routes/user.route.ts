import express, { Request, Response } from "express";
import { UserController } from "../controller/user.controller";
import { UserService } from "../service/user.service";
import { UserRepository } from "../repository/user.repository";
import { Repository } from "typeorm";
import { User } from "../entity/user.entity";
import { AppDataSource } from "../data-source";

const router = express.Router();

const userRepository = new UserRepository(AppDataSource.getRepository(User));
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get("/", userController.getAll);
router.post("/", userController.create);
router.get("/search", userController.getByEmail);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

export { router as userRouter };
