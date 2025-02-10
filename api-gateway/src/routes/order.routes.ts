import express from "express";
import { validateQuery } from "../middleware/validate-query";
import { validateBody } from "../middleware/validate-body";
import { validateId } from "../middleware/validate-id";
import { paginateSchema } from "../schemas/paginate.schema";
import { OrderController } from "../controller/order.controller";
import { createOrderSchema } from "../schemas/create-order.schema";
import { validateToken } from "../middleware/validate-token";

const router = express.Router();

const orderController = new OrderController();

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Obtiene todas las ordenes
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Ordenes obtenidos con exito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                    data:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: string
 *                          totalPrice:
 *                            type: number
 *                          orderDate:
 *                            type: string
 *                            format: date-time
 *                          userId:
 *                            type: number
 *                          stock:
 *                            type: number
 *                          user:
 *                            type: object
 *                            properties:
 *                              id:
 *                                type: number
 *                              fullName:
 *                                type: string
 *                          orderDetails:
 *                            type: array
 *                            items:
 *                               type: object
 *                               properties:
 *                                  id:
 *                                    type: number
 *                                  orderId:
 *                                    type: number
 *                                  productId:
 *                                    type: number
 *                                  productName:
 *                                    type: number
 *                                  productPrice:
 *                                    type: number
 *                                  quantity:
 *                                    type: number
 *                                  lineTotalPrice:
 *                                    type: number
 *                                  createdAt:
 *                                    type: string
 *                                    format: date-time
 *                                  updatedAt:
 *                                    type: string
 *                                    format: date-time
 *                    message:
 *                        type: string
 *       401:
 *         description: Token incorrecto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 */
router.get(
  "/",
  validateToken,
  validateQuery(paginateSchema),
  orderController.getAll
);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Obtiene una orden en base a su id
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Orden obtenida con exito
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  data:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: string
 *                        totalPrice:
 *                          type: number
 *                        orderDate:
 *                          type: string
 *                          format: date-time
 *                        userId:
 *                          type: number
 *                        stock:
 *                          type: number
 *                        user:
 *                          type: object
 *                          properties:
 *                            id:
 *                              type: number
 *                            fullName:
 *                              type: string
 *                        orderDetails:
 *                          type: array
 *                          items:
 *                             type: object
 *                             properties:
 *                                id:
 *                                  type: number
 *                                orderId:
 *                                  type: number
 *                                productId:
 *                                  type: number
 *                                productName:
 *                                  type: number
 *                                productPrice:
 *                                  type: number
 *                                quantity:
 *                                  type: number
 *                                lineTotalPrice:
 *                                  type: number
 *                                createdAt:
 *                                  type: string
 *                                  format: date-time
 *                                updatedAt:
 *                                  type: string
 *                                  format: date-time
 *                  message:
 *                      type: string
 *       401:
 *         description: Token incorrecto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *       404:
 *         description: La orden no existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 */
router.get("/:id", validateToken, validateId, orderController.getById);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Crea una nueva orden
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: number
 *                 example: 1
 *               products:
 *                 type: array
 *                 items:
 *                    type: object
 *                    properties:
 *                       productId:
 *                          type: number
 *                          example: 15
 *                       quantity:
 *                          type: number
 *                          example: 2
 *     responses:
 *       200:
 *         description: Orden creada con exito
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  data:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: string
 *                        totalPrice:
 *                          type: number
 *                        orderDate:
 *                          type: string
 *                          format: date-time
 *                        userId:
 *                          type: number
 *                        stock:
 *                          type: number
 *                        user:
 *                          type: object
 *                          properties:
 *                            id:
 *                              type: number
 *                            fullName:
 *                              type: string
 *                        orderDetails:
 *                          type: array
 *                          items:
 *                             type: object
 *                             properties:
 *                                id:
 *                                  type: number
 *                                orderId:
 *                                  type: number
 *                                productId:
 *                                  type: number
 *                                productName:
 *                                  type: number
 *                                productPrice:
 *                                  type: number
 *                                quantity:
 *                                  type: number
 *                                lineTotalPrice:
 *                                  type: number
 *                                createdAt:
 *                                  type: string
 *                                  format: date-time
 *                                updatedAt:
 *                                  type: string
 *                                  format: date-time
 *                  message:
 *                      type: string
 *       401:
 *         description: Token incorrecto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *       404:
 *         description: La orden no existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 */
router.post(
  "/",
  validateToken,
  validateBody(createOrderSchema),
  orderController.create
);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Elimina una orden en base a su id
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Orden eliminada con exito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 message:
 *                   type: string
 *       401:
 *         description: Token incorrecto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *       404:
 *         description: La orden no existe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 */
router.delete("/:id", validateToken, validateId, orderController.delete);

export { router as orderRouter };
