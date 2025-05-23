require("module-alias/register");

import express, { Request, Response } from "express";
import { config } from "dotenv";
import cors from "cors";

import { StatusCodes } from "@enums";
import { createResponse } from "@utils";
import { authRouter } from "@routes";

config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/auth", authRouter);

app.all("/", (req: Request, res: Response): Response => {
  return createResponse(
    res,
    "welcome to API",
    "API is running",
    StatusCodes.OK
  );
});

app.all("*", (req: Request, res: Response) => {
  return createResponse(res, null, "Route not found", StatusCodes.NOT_FOUND);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
