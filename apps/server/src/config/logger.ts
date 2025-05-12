import { FastifyInstance } from 'fastify';
import pino from 'pino';

const transport = pino.transport({
  target: 'pino-pretty',
  options: {
    colorize: true,
    translateTime: 'SYS:standard',
    ignore: 'pid,hostname',
    messageFormat: '{msg}',
    singleLine: true,
  },
});

export const logger = pino(
  {
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    redact: ['headers.authorization'],
  },
  transport
);

export function setupLogger(server: FastifyInstance) {
  // Add request logging
  server.addHook('onRequest', async request => {
    if (!request.url.startsWith('/api')) return;
    const startTime = Date.now();
    request.startTime = startTime;
  });

  // Add response logging
  server.addHook('onResponse', async (request, reply) => {
    if (!request.url.startsWith('/api')) return;

    const duration = Date.now() - (request.startTime as number);
    const statusCode = reply.statusCode;

    logger.info(`[${request.method}] ${request.url} ${statusCode} ${duration}ms`);
  });

  // Add error logging
  server.addHook('onError', async (request, reply, error) => {
    if (!request.url.startsWith('/api')) return;

    logger.error(
      {
        method: request.method,
        url: request.url,
        error: { message: error.message, stack: error.stack },
      },
      `[${request.method}] ${request.url} Error: ${error.message}`
    );
  });
}