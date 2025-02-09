import { Request, Response, NextFunction } from "express";
import { ProductService } from "../service/product.service";
import { AppError } from "../error/error-status";

export class ProductController {
  private productService: ProductService;
  constructor(productService: ProductService) {
    this.productService = productService;
  }

  public getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { limit, page } = req.query;
    try {
      const resp = await this.productService.getAll(
        limit ? Number(limit) : undefined,
        page ? Number(page) : undefined
      );
      res
        .status(200)
        .json({ data: resp, message: "Productos obtenidos con exito" });
    } catch (error) {
      console.log("Error obteniendo todos los productos");
      next(error);
    }
  };

  public create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const resp = await this.productService.create(req.body);
      res.status(201).json({ data: resp, message: "Usuario creado con exito" });
    } catch (error) {
      console.log("Error obteniendo todos los usuarios");
      return next(error);
    }
  };

  public getById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;
    try {
      if (!id || typeof id !== "string") {
        throw new AppError("Please add a valid id", 400);
      }
      const resp = await this.productService.getById(+id);
      res
        .status(200)
        .json({ data: resp, message: "Producto obtenido con exito" });
    } catch (error) {
      console.log("Error obteniendo el usuario por id");
      return next(error);
    }
  };

  public update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;
    const payload = req.body;
    try {
      if (!id) {
        return next(new AppError("Por favor proporcione un id correcto", 400));
      }

      const resp = await this.productService.update(+id, payload);
      res
        .status(200)
        .json({ data: resp, message: "Producto actualizado con exito" });
    } catch (error) {
      console.log("Error al actualizar el producto");
      return next(error);
    }
  };

  public delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;
    try {
      if (!id) {
        return next(new AppError("Por favor proporcione un id correcto", 400));
      }

      await this.productService.delete(+id);
      res
        .status(200)
        .json({ data: null, message: "Producto eliminado con exito" });
    } catch (error) {
      console.log("Error al eliminar el producto");
      return next(error);
    }
  };
}
