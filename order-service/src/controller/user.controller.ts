import { Request, Response, NextFunction } from "express";
import { UserService } from "../service/user.service";

export class UserController {
  private userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }

  public create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const resp = await this.userService.create(req.body);
      res.status(201).json({ data: resp, message: "Usuario creado con exito" });
    } catch (error) {
      console.log("Error sincronizando el usuario");
      return next(error);
    }
  };
}
