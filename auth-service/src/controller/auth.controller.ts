import { Request, Response, NextFunction } from "express";
import { AuthService } from "../service/auth.service";
import { SignInDto } from "../dto/sign-int.dto";
import { SignUpDto } from "../dto/sign-up.dto";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  public signIn = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const payload: SignInDto = req.body;
    try {
      const resp = await this.authService.signIn(
        payload.email,
        payload.password
      );
      res
        .status(200)
        .json({ data: resp, message: "Usuario autenticado con exito" });
    } catch (error) {
      console.log("Error intentando iniciar sesion");
      next(error);
    }
  };

  public signUp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const payload: SignUpDto = req.body;
    try {
      const resp = await this.authService.signUp(payload);
      res
        .status(200)
        .json({ data: resp, message: "Usuario registrado con exito" });
    } catch (error) {
      console.log("Error intentando registrar usuario");
      next(error);
    }
  };
}
