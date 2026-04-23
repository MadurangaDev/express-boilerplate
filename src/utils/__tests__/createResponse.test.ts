import type { Response } from "express";
import { describe, it, expect, vi } from "vitest";

import { StatusCodes } from "@enums";
import { createResponse, createResponseBody } from "@utils";

const createMockResponse = (): Response => {
  const res = {} as Response;
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe("createResponseBody", () => {
  it("should return a structured response body", () => {
    const result = createResponseBody({ id: 1 }, "success");

    expect(result).toEqual({
      body: { id: 1 },
      message: "success",
    });
  });
});

describe("createResponse", () => {
  it("should set status and return JSON body", () => {
    const res = createMockResponse();

    const result = createResponse(res, { id: 1 }, "success", StatusCodes.OK);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({
      body: { id: 1 },
      message: "success",
    });
    expect(result).toBe(res);
  });
});
