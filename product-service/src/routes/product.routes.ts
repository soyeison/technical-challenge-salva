import express from "express";
import { AppDataSource } from "../data-source";
import { validateQuery } from "../middleware/validate-query";
import { paginateSchema } from "../schemas/paginate.schema";
import { ProductRepository } from "../repository/product.repository";
import { ProductService } from "../service/product.service";
import { ProductController } from "../controller/product.controller";
import { Product } from "../entity/product.entity";
import { createProductSchema } from "../schemas/create-product.schema";
import { validateBody } from "../middleware/validate-body";
import { validateId } from "../middleware/validate-id";
import { updateProductSchema } from "../schemas/update-product.schema";
import { validateUnitsToRemove } from "../middleware/validate-units-to-remove";

const router = express.Router();

const productRepository = new ProductRepository(
  AppDataSource.getRepository(Product)
);
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

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

// TODO: Validar el parametro unitsToRemove
router.put(
  "/:id/:unitsToRemove",
  validateId,
  validateUnitsToRemove,
  productController.unitsToRemove
);

export { router as productRouter };
