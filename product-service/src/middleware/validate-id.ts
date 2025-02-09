import { NextFunction, Request, Response } from "express";
import { idSchema } from "../schemas/id.schema";

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const result = idSchema.safeParse(req.params.id);

  if (!result.success) {
    res.status(400).json({ error: "El ID debe ser numerico" });
  } else {
    req.params.id = result.data.toString();
    next();
  }
};
