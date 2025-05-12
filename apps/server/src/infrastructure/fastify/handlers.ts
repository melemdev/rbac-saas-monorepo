import { HttpResponse } from "domain/shared/http";
import { FastifyReply } from "fastify";
import { z } from "zod";
import {
  listResponseSchema,
  successResponseSchema,
  errorResponseSchema,
  PaginationProps,
} from "./validators/http/response.zod";

interface ListProps<T> {
  items: T[];
  pagination: PaginationProps;
  schema: z.ZodType<T>;
  message?: string;
}

export class FastifyResponseAdapter extends HttpResponse {
  private constructor(statusCode: number, data: unknown, message?: string) {
    super(statusCode, data, message);
  }

  private static send(
    reply: FastifyReply,
    response: HttpResponse
  ): FastifyReply {
    const statusCode = response.getStatusCode();
    const data = response.getData();
    const message = response.getMessage();

    if (statusCode === 204) {
      return reply.status(statusCode).send();
    }

    const isSuccess = statusCode >= 200 && statusCode < 300;
    const responseSchema = isSuccess
      ? successResponseSchema(z.any())
      : errorResponseSchema;

    const validatedData = responseSchema.parse({
      success: isSuccess,
      ...(isSuccess
        ? { data, message }
        : {
            error: {
              code: `ERROR_${statusCode}`,
              message: message || "An error occurred",
              details: data,
            },
          }),
    });

    return reply.status(statusCode).send(validatedData);
  }

  static Ok<T>(reply: FastifyReply, data: T, message?: string): FastifyReply {
    return this.send(reply, this.ok(data, message));
  }

  static Created<T>(
    reply: FastifyReply,
    data: T,
    message?: string
  ): FastifyReply {
    return this.send(reply, this.created(data, message));
  }

  static List<T>(reply: FastifyReply, data: ListProps<T>): FastifyReply {
    const responseSchema = listResponseSchema(data.schema);
    const validatedData = responseSchema.parse({
      items: data.items,
      pagination: data.pagination,
    });
    return this.send(reply, this.ok(validatedData, data.message));
  }

  static NoContent(reply: FastifyReply): FastifyReply {
    return this.send(reply, this.noContent());
  }

  static BadRequest(reply: FastifyReply, message: string): FastifyReply {
    return this.send(reply, this.badRequest(message));
  }

  static Unauthorized(reply: FastifyReply, message?: string): FastifyReply {
    return this.send(reply, this.unauthorized(message));
  }

  static Forbidden(reply: FastifyReply, message?: string): FastifyReply {
    return this.send(reply, this.forbidden(message));
  }

  static NotFound(reply: FastifyReply, message?: string): FastifyReply {
    return this.send(reply, this.notFound(message));
  }

  static ServerError(reply: FastifyReply, message?: string): FastifyReply {
    return this.send(reply, this.serverError(message));
  }
}
