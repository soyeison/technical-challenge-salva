import axios from "axios";
import { NextFunction, Request, Response } from "express";

const APP_PRODUCT_SERVICE_URL = "http://product-service:3008";

export class ProductController {
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
          ? `${APP_PRODUCT_SERVICE_URL}/products?limit=${limit}&page=${page}`
          : limit && !page
          ? `${APP_PRODUCT_SERVICE_URL}/products?limit=${limit}`
          : !limit && page
          ? `${APP_PRODUCT_SERVICE_URL}/products?page=${page}`
          : `${APP_PRODUCT_SERVICE_URL}/products`,
        {
          validateStatus: (status: number) => status < 500,
        }
      );
      res.status(resp.status).json(resp.data);
    } catch (error) {
      console.log("Error obteniendo todos los productos");
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
      const resp = await axios.get(
        `${APP_PRODUCT_SERVICE_URL}/products/${id}`,
        {
          validateStatus: (status: number) => status < 500,
        }
      );
      res.status(resp.status).json(resp.data);
    } catch (error) {
      console.log(`Error obteniendo el producto con id ${id}`);
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
        `${APP_PRODUCT_SERVICE_URL}/products`,
        payload,
        {
          validateStatus: (status: number) => status < 500,
        }
      );
      res.status(resp.status).json(resp.data);
    } catch (error) {
      console.log("Error creando un producto");
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
      const resp = await axios.put(
        `${APP_PRODUCT_SERVICE_URL}/products/${id}`,
        payload,
        {
          validateStatus: (status: number) => status < 500,
        }
      );
      res.status(resp.status).json(resp.data);
    } catch (error) {
      console.log("Error al actualizar un producto");
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
      const resp = await axios.delete(
        `${APP_PRODUCT_SERVICE_URL}/products/${id}`,
        {
          validateStatus: (status: number) => status < 500,
        }
      );
      res.status(resp.status).json(resp.data);
    } catch (error) {
      console.log("Error al eliminar un producto");
      return next(error);
    }
  };
}
