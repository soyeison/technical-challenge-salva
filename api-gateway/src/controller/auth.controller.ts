import axios from "axios";
import { NextFunction, Request, Response } from "express";

const APP_AUTH_SERVICE_URL = "http://auth-service:3005";

export class AuthController {
  public signIn = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const payload = req.body;
    try {
      const resp = await axios.post(
        `${APP_AUTH_SERVICE_URL}/auth/sign-in`,
        payload,
        {
          validateStatus: (status: number) => status < 500,
        }
      );
      res.status(resp.status).json(resp.data);
    } catch (error) {
      console.log("Error obteniendo todos los usuarios");
      next(error);
    }
  };

  public signUp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const payload = req.body;
    try {
      const resp = await axios.post(
        `${APP_AUTH_SERVICE_URL}/auth/sign-up`,
        payload,
        {
          validateStatus: (status: number) => status < 500,
        }
      );
      res.status(resp.status).json(resp.data);
    } catch (error) {
      console.log("Error obteniendo todos los usuarios");
      return next(error);
    }
  };
}
