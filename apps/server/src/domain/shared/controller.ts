import { HttpResponse } from "./http";

export abstract class IController<T, K> {
  async create(request: T, reply: K): Promise<HttpResponse> {
    throw "method not allowed";
  }

  async index(request: T, reply: K): Promise<HttpResponse> {
    throw "method not allowed";
  }

  async findOne(request: T, reply: K): Promise<HttpResponse> {
    throw "method not allowed";
  }

  async delete(request: T, reply: K): Promise<HttpResponse> {
    throw "method not allowed";
  }

  async update(request: T, reply: K): Promise<HttpResponse> {
    throw "method not allowed";
  }
}
