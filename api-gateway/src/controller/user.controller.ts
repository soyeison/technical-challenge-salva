import axios, { AxiosResponse } from "axios";
import { NextFunction, Request, Response } from "express";

const APP_SERVICE_URL = "http://user-service:3002";

export class UserController {
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
          ? `${APP_SERVICE_URL}/users?limit=${limit}&page=${page}`
          : limit && !page
          ? `${APP_SERVICE_URL}/users?limit=${limit}`
          : !limit && page
          ? `${APP_SERVICE_URL}/users?page=${page}`
          : `${APP_SERVICE_URL}/users`
      );
      res.status(resp.status).json(resp.data);
    } catch (error) {
      console.log("Error obteniendo todos los usuarios");
      next(error);
    }
  };

  public create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const payload = req.body;
    try {
      const resp = await axios.post(`${APP_SERVICE_URL}/users`, payload);
      res.status(resp.status).json(resp.data);
    } catch (error) {
      console.log("Error obteniendo todos los usuarios");
      return next(error);
    }
  };

  public getByEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { email } = req.query;
    try {
      const resp = await axios.get(`${APP_SERVICE_URL}/users?email=${email}`);
      res.status(resp.status).json(resp.data);
    } catch (error) {
      console.log("Error obteniendo el usuario por email");
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
      const resp = await axios.put(`${APP_SERVICE_URL}/users/${id}`, payload);
      res.status(resp.status).json(resp.data);
    } catch (error) {
      console.log("Error al actualizar el usuario");
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
      const resp = await axios.delete(`${APP_SERVICE_URL}/users/${id}`);
      res.status(resp.status).json(resp.data);
    } catch (error) {
      console.log("Error al eliminar el usuario");
      return next(error);
    }
  };
}
