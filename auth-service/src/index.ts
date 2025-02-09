import express, { Request, Response } from "express";
import "dotenv/config";
import { GlobalErrorHanlder } from "./middleware/error-handler";
import { authRouter } from "./routes/auth.route";
import { AppError } from "./error/error-status";

const app = express();

app.use(express.json());

// Health check
app.get("/healthcheck", (req: Request, res: Response) => {
  res.send("Users server working");
});

app.use("/auth", authRouter);

app.use((req, res, next) => {
  next(new AppError("Route not found", 404));
});

// Error handler
app.use(GlobalErrorHanlder.handleError);

app.listen(process.env.PORT, () => {
  console.log(`Server executing in port ${process.env.PORT}`);
});
