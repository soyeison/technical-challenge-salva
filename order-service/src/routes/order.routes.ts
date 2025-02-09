import express from "express";
import { AppDataSource } from "../data-source";
import { validateQuery } from "../middleware/validate-query";
import { validateBody } from "../middleware/validate-body";
import { validateId } from "../middleware/validate-id";
import { paginateSchema } from "../schemas/paginate.schema";
import { OrderController } from "../controller/order.controller";
import { OrderService } from "../service/order.service";
import { OrderRepository } from "../repository/order.repository";
import { Order } from "../entity/order.entity";
import { createOrderSchema } from "../schemas/create-order.schema";
import { UserRepository } from "../repository/user.repository";
import { User } from "../entity/user.entity";

const router = express.Router();

const userRepository = new UserRepository(AppDataSource.getRepository(User));
const orderRepository = new OrderRepository(AppDataSource.getRepository(Order));
const orderService = new OrderService(orderRepository, userRepository);
const orderController = new OrderController(orderService);

router.get("/", validateQuery(paginateSchema), orderController.getAll);
router.get("/:id", validateId, orderController.getById);
router.post("/", validateBody(createOrderSchema), orderController.create);
router.delete("/:id", validateId, orderController.delete);

export { router as orderRouter };
