import { Request, Response } from "express";
import { config } from "dotenv";
import { StatusCodes } from "@enums";
import { createResponseBody } from "@utils";

config();

export const loginController = async (req: Request, res: Response) => {
  return res
    .status(StatusCodes.OK)
    .json(createResponseBody("Login Successful", "Login successful"));
};
