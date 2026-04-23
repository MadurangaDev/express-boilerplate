import { Request, NextFunction, RequestHandler } from "express";
import { ZodTypeAny, infer as zInfer } from "zod";

import { IValidatedRequestData } from "@requests";
import { AppError } from "@utils";
import { StatusCodes } from "@enums";

export const setValidatedRequestData: RequestHandler = (req, _res, next) => {
  req.validated = {};
  next();
};

const createValidator =
  <TSchema extends ZodTypeAny, TSource extends keyof IValidatedRequestData>(
    schema: TSchema,
    source: TSource,
  ): RequestHandler =>
  (req: Request, _res: unknown, next: NextFunction) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      return next(
        new AppError(result.error.issues[0]?.message || "Invalid request", StatusCodes.BAD_REQUEST),
      );
    }

    req.validated = {
      ...req.validated,
      [source]: result.data,
    };

    next();
  };

const getValidatedData = <TSchema extends ZodTypeAny, TSource extends keyof IValidatedRequestData>(
  req: Request,
  schema: TSchema,
  source: TSource,
): zInfer<TSchema> => {
  const validatedData = req.validated?.[source];

  if (validatedData === undefined) {
    throw new AppError(`Validated request ${source} is missing`, StatusCodes.BAD_REQUEST);
  }

  return schema.parse(validatedData);
};

export const validateRequestBody = <TSchema extends ZodTypeAny>(schema: TSchema): RequestHandler =>
  createValidator(schema, "body");

export const validateRequestQuery = <TSchema extends ZodTypeAny>(schema: TSchema): RequestHandler =>
  createValidator(schema, "query");

export const validateRequestParams = <TSchema extends ZodTypeAny>(
  schema: TSchema,
): RequestHandler => createValidator(schema, "params");

export const validateRequestHeaders = <TSchema extends ZodTypeAny>(
  schema: TSchema,
): RequestHandler => createValidator(schema, "headers");

export const getValidatedBody = <TSchema extends ZodTypeAny>(
  req: Request,
  schema: TSchema,
): zInfer<TSchema> => getValidatedData(req, schema, "body");

export const getValidatedQuery = <TSchema extends ZodTypeAny>(
  req: Request,
  schema: TSchema,
): zInfer<TSchema> => getValidatedData(req, schema, "query");

export const getValidatedParams = <TSchema extends ZodTypeAny>(
  req: Request,
  schema: TSchema,
): zInfer<TSchema> => getValidatedData(req, schema, "params");

export const getValidatedHeaders = <TSchema extends ZodTypeAny>(
  req: Request,
  schema: TSchema,
): zInfer<TSchema> => getValidatedData(req, schema, "headers");
