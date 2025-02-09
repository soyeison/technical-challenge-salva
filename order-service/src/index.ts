import "dotenv/config";
import express, { Request, Response } from "express";
import { GlobalErrorHanlder } from "./middleware/error-handler";
import { AppError } from "./error/error-status";
import { AppDataSource } from "./data-source";
import { orderRouter } from "./routes/order.routes";

const app = express();

// Health check
app.get("/healthcheck", (req: Request, res: Response) => {
  res.status(200).send("Products server working");
});

app.use(express.json());

// Principal route
app.use("/orders", orderRouter);

// Manage 404 not found routes
app.use((req, res, next) => {
  next(new AppError("Route not found", 404));
});

// Error handler
app.use(GlobalErrorHanlder.handleError);

AppDataSource.initialize().then(async () => {
  app.listen(process.env.PORT, () => {
    console.log(`Server executing in port ${process.env.PORT}`);
  });
  console.log("Data source has been initialized");
});
