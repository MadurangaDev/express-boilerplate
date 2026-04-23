import { Request, Response } from "express";

import { StatusCodes } from "@enums";
import { createResponse } from "@utils";
import { getValidatedBody } from "@middlewares";
import { loginRequestSchema } from "@validators";
import { loginService } from "@services";
import { ILoginResponse } from "@responses";

export const handleLogin = async (req: Request, res: Response): Promise<Response> => {
  const loginPayload = getValidatedBody(req, loginRequestSchema);
  const loginResult: ILoginResponse = await loginService(loginPayload.email, loginPayload.password);
  return createResponse(res, loginResult, "Login successful", StatusCodes.OK);
};
