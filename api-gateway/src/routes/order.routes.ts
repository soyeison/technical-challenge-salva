import express from "express";
import { validateQuery } from "../middleware/validate-query";
import { validateBody } from "../middleware/validate-body";
import { validateId } from "../middleware/validate-id";
import { paginateSchema } from "../schemas/paginate.schema";
import { OrderController } from "../controller/order.controller";
import { createOrderSchema } from "../schemas/create-order.schema";

const router = express.Router();

const orderController = new OrderController();

router.get("/", validateQuery(paginateSchema), orderController.getAll);
router.get("/:id", validateId, orderController.getById);
router.post("/", validateBody(createOrderSchema), orderController.create);
router.delete("/:id", validateId, orderController.delete);

export { router as orderRouter };
