import express from "express";
import { validateId } from "../middleware/validate-id";
import { validateBody } from "../middleware/validate-body";
import { createUserSchema } from "../schemas/create-user.schema";
import { updateUserSchema } from "../schemas/update-user.schema";
import { validateQuery } from "../middleware/validate-query";
import { emailQuerySchema } from "../schemas/email.schema";
import { paginateSchema } from "../schemas/paginate.schema";
import { UserController } from "../controller/user.controller";
import { validateToken } from "../middleware/validate-token";

const router = express.Router();

const userController = new UserController();

router.get(
  "/",
  validateToken,
  validateQuery(paginateSchema),
  userController.getAll
);
router.post(
  "/",
  validateToken,
  validateBody(createUserSchema),
  userController.create
);
router.put(
  "/:id",
  validateToken,
  validateId,
  validateBody(updateUserSchema),
  userController.update
);
router.delete("/:id", validateToken, validateId, userController.delete);

export { router as userRouter };
