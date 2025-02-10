import express from "express";
import { validateId } from "../middleware/validate-id";
import { validateBody } from "../middleware/validate-body";
import { createUserSchema } from "../schemas/create-user.schema";
import { updateUserSchema } from "../schemas/update-user.schema";
import { validateQuery } from "../middleware/validate-query";
import { paginateSchema } from "../schemas/paginate.schema";
import { UserController } from "../controller/user.controller";
import { validateToken } from "../middleware/validate-token";

const router = express.Router();

const userController = new UserController();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtiene todos los usuarios registrados
 *     tags: [Users]
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
 *         description: Usuarios obtenidos con exito
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
 *                          firstName:
 *                            type: string
 *                          lastName:
 *                            type: string
 *                          email:
 *                            type: string
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
 *       400:
 *         description: El usuario ya existe
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
  userController.getAll
);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar un usuario por su id
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                  type: string
 *               lastName:
 *                  type: string
 *               email:
 *                  type: string
 *               createdAt:
 *                  type: string
 *                  format: date-time
 *               updatedAt:
 *                  type: string
 *                  format: date-time
 *     responses:
 *       200:
 *         description: Usuario actualizado con exito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                      firstName:
 *                        type: string
 *                      lastName:
 *                        type: string
 *                      email:
 *                        type: string
 *                      createdAt:
 *                        type: string
 *                        format: date-time
 *                      updatedAt:
 *                        type: string
 *                        format: date-time
 *                 message:
 *                    type: string
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
 *       400:
 *         description: El usuario ya existe
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
  validateBody(updateUserSchema),
  userController.update
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Actualizar un usuario por su id
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: Usuario actualizado con exito
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
 *       400:
 *         description: El usuario ya existe
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
router.delete("/:id", validateToken, validateId, userController.delete);

export { router as userRouter };
