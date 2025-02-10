import { NextFunction, Request, Response } from "express";
import { idSchema } from "../schemas/id.schema";

export const validateUnitsToRemove = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = idSchema.safeParse(req.params.unitsToRemove);

  if (!result.success) {
    res
      .status(400)
      .json({ error: "El parametro unitsToRemove debe ser numerico" });
  } else {
    req.params.unitsToRemove = result.data.toString();
    next();
  }
};
