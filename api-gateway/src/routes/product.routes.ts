import express from "express";
import { validateQuery } from "../middleware/validate-query";
import { paginateSchema } from "../schemas/paginate.schema";
import { ProductController } from "../controller/product.controller";
import { createProductSchema } from "../schemas/create-product.schema";
import { updateProductSchema } from "../schemas/update-product.schema";
import { validateBody } from "../middleware/validate-body";
import { validateId } from "../middleware/validate-id";

const router = express.Router();

const productController = new ProductController();

router.get("/", validateQuery(paginateSchema), productController.getAll);
router.post("/", validateBody(createProductSchema), productController.create);
router.get("/:id", validateId, productController.getById);
router.put(
  "/:id",
  validateId,
  validateBody(updateProductSchema),
  productController.update
);
router.delete("/:id", validateId, productController.delete);

export { router as productRouter };
