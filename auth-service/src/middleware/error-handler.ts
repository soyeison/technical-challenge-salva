import { Request, Response, NextFunction } from "express";
import { AppError } from "../error/error-status";

export class GlobalErrorHanlder {
  static async handleError(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (err instanceof AppError) {
      res.status(err.status).json({
        errors: {
          message: err.message,
        },
      });
    } else {
      console.log("Error: ", err);
      res.status(500).json({
        errors: {
          message: "An unknown error occurred",
        },
      });
    }
  }
}
