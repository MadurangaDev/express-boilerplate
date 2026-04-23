import { ILoginResponse } from "@responses";
import { StatusCodes } from "@enums";
import { AppError, logger } from "@utils";

export const loginService = async (email: string, _password: string): Promise<ILoginResponse> => {
  try {
    return {
      email,
      token: "<JWT_TOKEN>",
    };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    logger.error({ err: error }, "Login service failed");

    throw new AppError("Something went wrong.", StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
