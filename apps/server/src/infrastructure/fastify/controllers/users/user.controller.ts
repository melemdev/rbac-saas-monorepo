import { IController } from "domain/shared/controller";
import { HttpResponse } from "domain/shared/http";
import { FastifyResponseAdapter } from "infrastructure/fastify/handlers";
import { Reply, Request } from "infrastructure/fastify/types/http";

export class UserController extends IController<Request, Reply> {
  async create(request: Request, reply: Reply): Promise<HttpResponse> {
    return FastifyResponseAdapter.Created(reply, "User has been created");
  }
}
