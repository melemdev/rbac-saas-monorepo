import "dotenv/config";
import { config } from "config/env";
import { logger } from "config/logger";
import { fastifyApp } from "infrastructure/fastify/app";

fastifyApp({ port: config.port, prefix: config.api.prefix }).catch((err) => {
  logger.fatal("Server cannot bet initialized");
});
