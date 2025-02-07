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

// El .bind es para que se pueda mantener la referencia de this correctamente
router.get("/", userController.getAll.bind(userController));
router.post("/", userController.create.bind(userController));
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`Obtener usuario ${id}`);
});

export { router as userRouter };
