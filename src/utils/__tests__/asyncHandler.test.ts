import { describe, it, expect, vi } from "vitest";
import { asyncHandler } from "../asyncHandler.js";
import type { Request, Response, NextFunction } from "express";

describe("asyncHandler", () => {
  it("calls the handler and passes through on success", async () => {
    const fn = vi.fn().mockResolvedValue(undefined);
    const req = {} as Request;
    const res = {} as Response;
    const next = vi.fn() as NextFunction;

    await asyncHandler(fn)(req, res, next);
    expect(fn).toHaveBeenCalledWith(req, res, next);
    expect(next).not.toHaveBeenCalled();
  });

  it("calls next with error when handler rejects", async () => {
    const error = new Error("fail");
    const fn = vi.fn().mockRejectedValue(error);
    const req = {} as Request;
    const res = {} as Response;
    const next = vi.fn() as NextFunction;

    await asyncHandler(fn)(req, res, next);
    expect(next).toHaveBeenCalledWith(error);
  });
});
