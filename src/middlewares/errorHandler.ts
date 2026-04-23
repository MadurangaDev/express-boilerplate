import { Request, Response, NextFunction } from "express";

import { AppError, createResponse } from "@utils";
import { StatusCodes } from "@enums";
import { logger } from "@utils";

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
