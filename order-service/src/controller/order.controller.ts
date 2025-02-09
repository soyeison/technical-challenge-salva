import { Request, Response, NextFunction } from "express";
import { OrderService } from "../service/order.service";
import { AppError } from "../error/error-status";

export class OrderController {
  private orderService: OrderService;
  constructor(orderService: OrderService) {
    this.orderService = orderService;
  }

  public getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { limit, page } = req.query;
    try {
      const resp = await this.orderService.getAll(
        limit ? Number(limit) : undefined,
        page ? Number(page) : undefined
      );
      res
        .status(200)
        .json({ data: resp, message: "Ordenes obtenidas con exito" });
    } catch (error) {
      console.log("Error obteniendo todas las ordenes");
      next(error);
    }
  };

  public create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const resp = await this.orderService.create(req.body);
      res.status(201).json({ data: resp, message: "Orden creada con exito" });
    } catch (error) {
      console.log("Error creando la orden");
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
      const resp = await this.orderService.getById(+id);
      res.status(200).json({ data: resp, message: "Orden obtenida con exito" });
    } catch (error) {
      console.log("Error obteniendo la orden por id");
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

      await this.orderService.delete(+id);
      res
        .status(200)
        .json({ data: null, message: "Orden eliminada con exito" });
    } catch (error) {
      console.log("Error al eliminar la orden");
      return next(error);
    }
  };
}
