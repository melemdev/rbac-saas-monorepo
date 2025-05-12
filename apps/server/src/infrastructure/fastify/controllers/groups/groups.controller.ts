import { IController } from "domain/shared/controller";
import { HttpResponse } from "domain/shared/http";
import { FastifyResponseAdapter } from "infrastructure/fastify/handlers";
import { Reply, Request } from "infrastructure/fastify/types/http";

export class GroupsController extends IController<Request, Reply> {
  async create(request: Request, reply: Reply): Promise<HttpResponse> {
    return FastifyResponseAdapter.Created(reply, { id: 1 });
  }

  async delete(request: Request, reply: Reply): Promise<HttpResponse> {
    return FastifyResponseAdapter.Created(reply, { id: 1 });
  }

  async findOne(request: Request, reply: Reply): Promise<HttpResponse> {
    return FastifyResponseAdapter.Created(reply, { id: 1 });
  }

  async index(request: Request, reply: Reply): Promise<HttpResponse> {
    return FastifyResponseAdapter.Created(reply, { id: 1 });
  }

  async update(request: Request, reply: Reply): Promise<HttpResponse> {
    return FastifyResponseAdapter.Created(reply, { id: 1 });
  }

  async addMember(request: Request, reply: Reply): Promise<HttpResponse> {
    return FastifyResponseAdapter.Created(reply, { id: 1 });
  }

  async removeMember(request: Request, reply: Reply): Promise<HttpResponse> {
    return FastifyResponseAdapter.Created(reply, { id: 1 });
  }
}
