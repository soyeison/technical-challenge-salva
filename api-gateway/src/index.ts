import "dotenv/config";
import express, { Request, Response } from "express";
import { userRouter } from "./routes/user.routes";

const app = express();

app.use(express.json());

app.get("/healthcheck", (req: Request, res: Response) => {
  res.send("Server working");
});

app.use("/users", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server executing in port ${process.env.PORT}`);
});
