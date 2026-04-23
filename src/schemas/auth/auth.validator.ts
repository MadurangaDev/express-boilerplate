import { z } from "zod";
import { registry } from "@openAPIRegistry";

export const loginRequestSchema = registry.register(
  "LoginRequest",
  z.object({
    email: z
      .email({
        error: "Please provide a valid email address",
      })
      .openapi({ example: "user@example.com" }),
    password: z
      .string({
        error: "Password must be a string",
      })
      .min(8, {
        error: "Password must be at least 8 characters long",
      })
      .openapi({ example: "password123" }),
  }),
);

export const loginResponseSchema = registry.register(
  "LoginResponse",
  z.object({
    email: z.email().openapi({ example: "user@example.com" }),
    token: z.string().openapi({ example: "eyJhbGciOiJIUzI1NiJ9..." }),
  }),
);

// Swagger API Documentation
export const registerAuthSchemas = (): void => {
  registry.registerPath({
    method: "post",
    path: "/auth/login",
    tags: ["Auth"],
    request: {
      body: {
        content: { "application/json": { schema: loginRequestSchema } },
        required: true,
      },
    },
    responses: {
      200: {
        description: "Login successful",
        content: { "application/json": { schema: loginResponseSchema } },
      },
    },
  });
};
