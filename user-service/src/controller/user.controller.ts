import { NextFunction, Request, Response } from "express";
import { UserService } from "../service/user.service";
import { ErrorWithStatus } from "../error/error-status";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const resp = await this.userService.getAll();
      res
        .status(200)
        .json({ data: resp, message: "Usuarios obtenidos con exito" });
    } catch (error) {
      console.log("Error obteniendo todos los usuarios");
      return next(error);
    }
  }
}
