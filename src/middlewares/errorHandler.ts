import { Request, Response, NextFunction } from "express";

import { AppError, createResponse, logger } from "@utils";
import { StatusCodes } from "@enums";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof AppError) {
    createResponse(res, null, err.message, err.statusCode);
    return;
  }

  logger.error({ err }, "UNHANDLED ERROR:");
  createResponse(res, null, "Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR);
};
