import express, { Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

import { env } from "@configs";
import { generateOpenAPISpec } from "./configs/openapi.config.js";
import { StatusCodes } from "@enums";
import { errorHandler, setValidatedRequestData } from "@middlewares";
import { authRoutes } from "@routes";
import { AppError, createResponse } from "@utils";
import { RATE_LIMIT, REQUEST_BODY_SIZE_LIMIT } from "@constants";

export const app = express();

const allowedOrigins = env.CORS_ORIGINS?.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin:
      env.NODE_ENV === "production"
        ? allowedOrigins && allowedOrigins.length > 0
          ? allowedOrigins
          : false
        : allowedOrigins && allowedOrigins.length > 0
          ? allowedOrigins
          : true,
  }),
);
app.use(express.json({ limit: REQUEST_BODY_SIZE_LIMIT }));
app.use(helmet());
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));

app.use(
  rateLimit({
    windowMs: RATE_LIMIT,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_req, _res, next) => {
      next(
        new AppError("Too many requests, please try again later.", StatusCodes.TOO_MANY_REQUESTS),
      );
    },
  }),
);

app.use(setValidatedRequestData);

if (env.NODE_ENV !== "production") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(generateOpenAPISpec()));
}

app.use("/auth", authRoutes);

app.all("/", (_req: Request, res: Response): Response => {
  return createResponse(res, "welcome to API", "API is running", StatusCodes.OK);
});

app.all("*", () => {
  throw new AppError("Route not found or Method not allowed", StatusCodes.NOT_FOUND);
});

app.use(errorHandler);
