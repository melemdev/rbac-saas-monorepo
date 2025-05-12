import { fastify } from "fastify";

import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { config } from "config/env";
import { logger } from "config/logger";
import Router from "./routes/routes";

interface FastifyAppProps {
  port: number;
  prefix: string;
}

export async function fastifyApp({ port, prefix }: FastifyAppProps) {
  try {
    const server = fastify({ logger: config.log_level == "verbose" });

    logger.debug("Logger Level: " + config.log_level);

    // Set logger
    server.log = logger;

    // Set type provider
    server.withTypeProvider<ZodTypeProvider>();

    // Set validators
    server.setValidatorCompiler(validatorCompiler);
    server.setSerializerCompiler(serializerCompiler);

    // Set error handler
    // server.setErrorHandler(errorHandler);

    // Setup HTTP request logging
    // setupLogger(server);

    // Register plugins
    await server.register(fastifyCors, config.cors);

    await server.register(fastifySwagger, {
      openapi: {
        info: {
          title: config.swagger.title,
          version: config.swagger.version,
        },
      },
      transform: jsonSchemaTransform,
    });

    await server.register(fastifySwaggerUi, {
      routePrefix: config.swagger.routePrefix,
    });

    // Register routes
    await server.register(Router, { prefix });
    await server.listen({ port, host: "0.0.0.0" });
  } catch (err) {
    logger.error("Failed to start server:", err);
    console.log(err);
    process.exit(1);
  }
}
