import "dotenv/config";
import express, { Request, Response } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { userRouter } from "./routes/user.routes";
import { AppError } from "./error/error-status";
import { GlobalErrorHanlder } from "./middleware/error-handler";
import { authRouter } from "./routes/auth.routes";
import { productRouter } from "./routes/product.routes";
import { orderRouter } from "./routes/order.routes";
import swaggerOptions from "./swaggerConfig";

const app = express();

app.use(express.json());

app.get("/healthcheck", (req: Request, res: Response) => {
  res.send("Server working");
});

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);

// Generar la documentacion de Swagger
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Manage 404 not found routes
app.use((req, res, next) => {
  next(new AppError("Route not found", 404));
});

// Error handler
app.use(GlobalErrorHanlder.handleError);

app.listen(process.env.PORT, () => {
  console.log(`Server executing in port ${process.env.PORT}`);
});
