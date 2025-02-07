import express, { Request, Response } from "express";
import { UserController } from "../controller/user.controller";
import { UserService } from "../service/user.service";
import { UserRepository } from "../repository/user.repository";

const router = express.Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// El .bind es para que se pueda mantener la referencia de this correctamente
router.get("/", userController.getAll.bind(userController));

router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`Obtener usuario ${id}`);
});

export { router as userRouter };
