import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { specs } from "./swagger";
import productRoutes from "./routes/productRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import { HttpError } from "./utils/customErrors";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

// 404 handler
app.use((_req, _res, next) => {
  const err = new HttpError(404, "Not Found");
  next(err);
});

// Global error handler
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err);

    if (err instanceof HttpError) {
      res.status(err.status).json({
        error: {
          message: err.message,
          status: err.status,
        },
      });
    } else {
      res.status(500).json({
        error: {
          message: "Internal Server Error",
          status: 500,
        },
      });
    }
  }
);

export default app;
