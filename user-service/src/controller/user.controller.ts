import { NextFunction, Request, Response } from "express";
import { UserService } from "../service/user.service";
import { AppError } from "../error/error-status";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { limit, page } = req.query;
    try {
      const resp = await this.userService.getAll(
        limit ? Number(limit) : undefined,
        page ? Number(page) : undefined
      );
      res
        .status(200)
        .json({ data: resp, message: "Usuarios obtenidos con exito" });
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
    try {
      const resp = await this.userService.create(req.body);
      res.status(201).json({ data: resp, message: "Usuario creado con exito" });
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
      if (!email || typeof email !== "string") {
        throw new AppError("Please add a valid email", 400);
      }
      const resp = await this.userService.getByEmail(email);
      res
        .status(200)
        .json({ data: resp, message: "Usuario obtenido con exito" });
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
      if (!id) {
        return next(new AppError("Por favor proporcione un id correcto", 400));
      }

      const resp = await this.userService.update(+id, payload);
      res
        .status(200)
        .json({ data: resp, message: "Usuario actualizado con exito" });
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
      if (!id) {
        return next(new AppError("Por favor proporcione un id correcto", 400));
      }

      await this.userService.delete(+id);
      res
        .status(200)
        .json({ data: null, message: "Usuario eliminado con exito" });
    } catch (error) {
      console.log("Error al eliminar el usuario");
      return next(error);
    }
  };
}
