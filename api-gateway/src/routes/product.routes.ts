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

router.get(
  "/",
  validateToken,
  validateQuery(paginateSchema),
  productController.getAll
);
router.post(
  "/",
  validateToken,
  validateBody(createProductSchema),
  productController.create
);
router.get("/:id", validateToken, validateId, productController.getById);
router.put(
  "/:id",
  validateToken,
  validateId,
  validateBody(updateProductSchema),
  productController.update
);
router.delete("/:id", validateToken, validateId, productController.delete);

export { router as productRouter };
