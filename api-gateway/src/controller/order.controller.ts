import axios from "axios";
import { NextFunction, Request, Response } from "express";

const APP_ORDER_SERVICE_URL = "http://order-service:3006";

export class OrderController {
  public getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    // TODO: Refactorizar esto
    const { limit, page } = req.query;
    try {
      const resp = await axios.get(
        limit && page
          ? `${APP_ORDER_SERVICE_URL}/orders?limit=${limit}&page=${page}`
          : limit && !page
          ? `${APP_ORDER_SERVICE_URL}/orders?limit=${limit}`
          : !limit && page
          ? `${APP_ORDER_SERVICE_URL}/orders?page=${page}`
          : `${APP_ORDER_SERVICE_URL}/orders`,
        {
          validateStatus: (status: number) => status < 500,
        }
      );
      res.status(resp.status).json(resp.data);
    } catch (error) {
      console.log("Error obteniendo todas las ordenes");
      next(error);
    }
  };

  public getById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;
    try {
      const resp = await axios.get(`${APP_ORDER_SERVICE_URL}/orders/${id}`, {
        validateStatus: (status: number) => status < 500,
      });
      res.status(resp.status).json(resp.data);
    } catch (error) {
      console.log(`Error obteniendo la orden con id ${id}`);
      return next(error);
    }
  };

  public create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const payload = req.body;
    try {
      const resp = await axios.post(
        `${APP_ORDER_SERVICE_URL}/orders`,
        payload,
        {
          validateStatus: (status: number) => status < 500,
        }
      );
      res.status(resp.status).json(resp.data);
    } catch (error) {
      console.log("Error creando una orden");
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
      const resp = await axios.delete(`${APP_ORDER_SERVICE_URL}/orders/${id}`, {
        validateStatus: (status: number) => status < 500,
      });
      res.status(resp.status).json(resp.data);
    } catch (error) {
      console.log("Error al eliminar una orden");
      return next(error);
    }
  };
}
