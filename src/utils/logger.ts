import pino from "pino";

const nodeEnv = process.env.NODE_ENV; // logger doesn't depend on env, so we can read it directly without stubbing

export const logger = pino({
  level: nodeEnv === "production" ? "info" : "debug",
  transport:
    nodeEnv !== "production" ? { target: "pino-pretty", options: { colorize: true } } : undefined,
});
