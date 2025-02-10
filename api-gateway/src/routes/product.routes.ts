import express from "express";
import { validateQuery } from "../middleware/validate-query";
import { paginateSchema } from "../schemas/paginate.schema";
import { ProductController } from "../controller/product.controller";
import { createProductSchema } from "../schemas/create-product.schema";
import { updateProductSchema } from "../schemas/update-product.schema";
import { validateBody } from "../middleware/validate-body";
import { validateId } from "../middleware/validate-id";
import { validateToken } from "../middleware/validate-token";

const router = express.Router();

const productController = new ProductController();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Limit the number of results
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Productos obtenidos con exito
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
 *                          name:
 *                            type: string
 *                          description:
 *                            type: string
 *                          price:
 *                            type: number
 *                          stock:
 *                            type: number
 *                          createdAt:
 *                            type: string
 *                            format: date-time
 *                          updatedAt:
 *                            type: string
 *                            format: date-time
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
  productController.getAll
);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Permite crear un producto
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nevera"
 *               description:
 *                 type: string
 *                 example: "Descripcion de una nevera"
 *               price:
 *                 type: number
 *                 example: 1000000
 *               stock:
 *                 type: number
 *                 example: 3
 *     responses:
 *       200:
 *         description: Productos obtenidos con exito
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
 *                          name:
 *                            type: string
 *                          description:
 *                            type: string
 *                          price:
 *                            type: number
 *                          stock:
 *                            type: number
 *                          createdAt:
 *                            type: string
 *                            format: date-time
 *                          updatedAt:
 *                            type: string
 *                            format: date-time
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
router.post(
  "/",
  validateToken,
  validateBody(createProductSchema),
  productController.create
);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Permite obtener un producto por su id
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Productos obtenidos con exito
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
 *                        name:
 *                          type: string
 *                        description:
 *                          type: string
 *                        price:
 *                          type: number
 *                        stock:
 *                          type: number
 *                        createdAt:
 *                          type: string
 *                          format: date-time
 *                        updatedAt:
 *                          type: string
 *                          format: date-time
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
 *         description: El producto no existe
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
router.get("/:id", validateToken, validateId, productController.getById);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Permite actualizar un producto por su id
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nevera"
 *               description:
 *                 type: string
 *                 example: "Descripcion de una nevera"
 *               price:
 *                 type: number
 *                 example: 1000000
 *               stock:
 *                 type: number
 *                 example: 3
 *     responses:
 *       200:
 *         description: Productos obtenidos con exito
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
 *                        name:
 *                          type: string
 *                        description:
 *                          type: string
 *                        price:
 *                          type: number
 *                        stock:
 *                          type: number
 *                        createdAt:
 *                          type: string
 *                          format: date-time
 *                        updatedAt:
 *                          type: string
 *                          format: date-time
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
 *         description: El producto no existe
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
router.put(
  "/:id",
  validateToken,
  validateId,
  validateBody(updateProductSchema),
  productController.update
);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Permite eliminar un producto por su id
 *     tags: [Products]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Productos obtenidos con exito
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
 *         description: El producto no existe
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
router.delete("/:id", validateToken, validateId, productController.delete);

export { router as productRouter };
