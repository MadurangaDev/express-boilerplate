import { env } from "@configs";
import { Server } from "node:http";
import { logger } from "@utils";

import { app } from "./app.js";

const server: Server = app.listen(env.PORT, () => {
  logger.info({ port: env.PORT }, "Server is running");
});

const shutdown = (signal: string, exitCode = 0): void => {
  logger.info({ signal, exitCode }, "Shutting down gracefully");

  server.close((error) => {
    if (error) {
      logger.error({ err: error, signal }, "Error while closing the server");
      process.exit(1);
    }

    process.exit(exitCode);
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

process.on("uncaughtException", (error) => {
  logger.fatal({ err: error }, "Uncaught exception");
  shutdown("uncaughtException", 1);
});

process.on("unhandledRejection", (reason) => {
  logger.error({ reason }, "Unhandled promise rejection");
  shutdown("unhandledRejection", 1);
});
