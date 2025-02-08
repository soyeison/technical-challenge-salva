import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateQuery = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      res.status(400).json({
        error: "Ivalid data in query params",
        details: result.error.format(),
      });
    } else {
      next();
    }
  };
};
