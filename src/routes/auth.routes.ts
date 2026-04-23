import { Router } from "express";

import { handleLogin } from "@controllers";
import { validateRequestBody } from "@middlewares";
import { loginRequestSchema } from "@validators";
import { asyncHandler } from "@utils";

const authRoutes = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and returns a JWT token. [to be developed. Currently returns a success message without actual authentication logic.]
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: sample@sample.com
 *               password:
 *                 type: string
 *                 example: samplePassword
 */
authRoutes.post("/login", validateRequestBody(loginRequestSchema), asyncHandler(handleLogin));

export { authRoutes };
