import "dotenv/config";
import express, { Request, Response } from "express";
import { userRouter } from "./routes/user.route";
import { GlobalErrorHanlder } from "./middleware/error-handler";
import { AppDataSource } from "./data-source";

const app = express();

// Health check
app.get("/healthcheck", (req: Request, res: Response) => {
  res.send("Users server working");
});

app.use(express.json());

// Principal route
app.use("/user", userRouter);

// Error handler
app.use(GlobalErrorHanlder.handleError);

AppDataSource.initialize().then(async () => {
  app.listen(process.env.PORT, () => {
    console.log(`Server executing in port ${process.env.PORT}`);
  });
  console.log("Data source has been initialized");
});
