import "dotenv/config";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../error/error-status";

type JwtPayload = {
  userId: number;
};

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ data: null, message: "Token no proporcionado" });
  } else {
    const token = authHeader.split(" ")[1];

    try {
      jwt.verify(token, process.env.JWT_SECRET_KEY || "") as JwtPayload;
      next();
    } catch (error) {
      console.log("Error validando token", error);
      next(new AppError("Error inesperado validando token", 500));
    }
  }
};
