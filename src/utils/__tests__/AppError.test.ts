import { describe, it, expect } from "vitest";
import { AppError } from "../AppError.js";

describe("AppError", () => {
  it("sets statusCode and message correctly", () => {
    const err = new AppError("Not found", 404);
    expect(err.message).toBe("Not found");
    expect(err.statusCode).toBe(404);
    expect(err.isOperational).toBe(true);
  });

  it("defaults isOperational to true", () => {
    const err = new AppError("error", 500);
    expect(err.isOperational).toBe(true);
  });

  it("allows isOperational to be set to false", () => {
    const err = new AppError("crash", 500, false);
    expect(err.isOperational).toBe(false);
  });
});
