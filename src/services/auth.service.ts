import { ILoginResponse } from "@responses";
import { StatusCodes } from "@enums";
import { AppError } from "@utils";

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
    if (error instanceof Error) {
      throw new AppError(
        `Something went wrong. cause: ${(error as Error).message}`,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
    throw new AppError("Something went wrong.", StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
