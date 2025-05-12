import { IController } from "domain/shared/controller";
import { HttpResponse } from "domain/shared/http";
import { FastifyResponseAdapter } from "infrastructure/fastify/handlers";
import { Reply, Request } from "infrastructure/fastify/types/http";

export class PermissionController extends IController<Request, Reply> {
  async create(request: Request, reply: Reply): Promise<HttpResponse> {
    return FastifyResponseAdapter.Ok(reply, "Permission Controller has been initialized");
  }

  async delete(request: Request, reply: Reply): Promise<HttpResponse> {
    return FastifyResponseAdapter.Ok(reply, "Permission Controller has been initialized");
  }

  async findOne(request: Request, reply: Reply): Promise<HttpResponse> {
    return FastifyResponseAdapter.Ok(reply, "Permission Controller has been initialized");
  }

  async index(request: Request, reply: Reply): Promise<HttpResponse> {
    return FastifyResponseAdapter.Ok(reply, "Permission Controller has been initialized");
  }

  async update(request: Request, reply: Reply): Promise<HttpResponse> {
    return FastifyResponseAdapter.Ok(reply, "Permission Controller has been initialized");
  }
}
