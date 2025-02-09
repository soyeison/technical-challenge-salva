import express from "express";
import { validateId } from "../middleware/validate-id";
import { validateBody } from "../middleware/validate-body";
import { createUserSchema } from "../schemas/create-user.schema";
import { updateUserSchema } from "../schemas/update-user.schema";
import { validateQuery } from "../middleware/validate-query";
import { emailQuerySchema } from "../schemas/email.schema";
import { paginateSchema } from "../schemas/paginate.schema";
import { UserController } from "../controller/user.controller";

const router = express.Router();

const userController = new UserController();

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
