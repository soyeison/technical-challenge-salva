import "dotenv/config";
import express, { Request, Response } from "express";
import { userRouter } from "./routes/user.route";
import { GlobalErrorHanlder } from "./middleware/error-handler";
import { AppDataSource } from "./data-source";
import { AppError } from "./error/error-status";

const app = express();

// Health check
app.get("/healthcheck", (req: Request, res: Response) => {
  res.send("Users server working");
});

app.use(express.json());

// Principal route
app.use("/users", userRouter);

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
