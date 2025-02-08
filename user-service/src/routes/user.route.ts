import express, { Request, Response } from "express";
import { UserController } from "../controller/user.controller";
import { UserService } from "../service/user.service";
import { UserRepository } from "../repository/user.repository";
import { Repository } from "typeorm";
import { User } from "../entity/user.entity";
import { AppDataSource } from "../data-source";
import { validateId } from "../middleware/validate-id";
import { validateBody } from "../middleware/validate-body";
import { createUserSchema } from "../schemas/create-user.schema";
import { updateUserSchema } from "../schemas/update-user.schema";
import { validateQuery } from "../middleware/validate-query";
import { emailQuerySchema } from "../schemas/email.schema";
import { paginateSchema } from "../schemas/paginate.schema";

const router = express.Router();

const userRepository = new UserRepository(AppDataSource.getRepository(User));
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get("/", validateQuery(paginateSchema), userController.getAll);
router.post("/", validateBody(createUserSchema), userController.create);
router.get(
  "/search",
  validateQuery(emailQuerySchema),
  userController.getByEmail
);
router.put(
  "/:id",
  validateId,
  validateBody(updateUserSchema),
  userController.update
);
router.delete("/:id", validateId, userController.delete);

export { router as userRouter };
