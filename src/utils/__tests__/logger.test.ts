import { beforeEach, describe, expect, it, vi } from "vitest";

const createPinoMock = (): {
  pino: ReturnType<typeof vi.fn>;
  pinoInstance: { mock: boolean };
} => {
  const pinoInstance = { mock: true };
  const pino = vi.fn(() => pinoInstance);
  return { pino, pinoInstance };
};

describe("logger", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
  });

  it("uses debug level with pretty transport outside production", async () => {
    vi.stubEnv("NODE_ENV", "development");
    const { pino, pinoInstance } = createPinoMock();

    vi.doMock("pino", () => ({
      default: pino,
    }));

    const { logger } = await import("../logger.js");

    expect(pino).toHaveBeenCalledWith({
      level: "debug",
      transport: { target: "pino-pretty", options: { colorize: true } },
    });
    expect(logger).toBe(pinoInstance);
  });

  it("uses info level without pretty transport in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const { pino, pinoInstance } = createPinoMock();

    vi.doMock("pino", () => ({
      default: pino,
    }));

    const { logger } = await import("../logger.js");

    expect(pino).toHaveBeenCalledWith({
      level: "info",
      transport: undefined,
    });
    expect(logger).toBe(pinoInstance);
  });
});
