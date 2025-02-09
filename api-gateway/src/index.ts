import "dotenv/config";
import express, { Request, Response } from "express";
import { userRouter } from "./routes/user.routes";
import { AppError } from "./error/error-status";
import { GlobalErrorHanlder } from "./middleware/error-handler";
import { authRouter } from "./routes/auth.routes";

const app = express();

app.use(express.json());

app.get("/healthcheck", (req: Request, res: Response) => {
  res.send("Server working");
});

app.use("/users", userRouter);
app.use("/auth", authRouter);

// Manage 404 not found routes
app.use((req, res, next) => {
  next(new AppError("Route not found", 404));
});

// Error handler
app.use(GlobalErrorHanlder.handleError);

app.listen(process.env.PORT, () => {
  console.log(`Server executing in port ${process.env.PORT}`);
});
