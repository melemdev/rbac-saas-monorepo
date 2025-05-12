import { HttpResponse } from "domain/shared/http";
import { Reply, Request } from "infrastructure/fastify/types/http";

export class AuthController {
  constructor() {}

  async signIn(request: Request, reply: Reply): Promise<HttpResponse> {
    throw "method not allowed";
  }

  async signUp(request: Request, reply: Reply): Promise<HttpResponse> {
    throw "method not allowed";
  }

  async logout(request: Request, reply: Reply): Promise<HttpResponse> {
    throw "method not allowed";
  }

  async refreshAccessToken(request: Request, reply: Reply): Promise<HttpResponse> {
    throw "method not allowed";
  }

  async recoveryPassword(request: Request, reply: Reply): Promise<HttpResponse> {
    throw "method not allowed";
  }

  async resetPassword(request: Request, reply: Reply): Promise<HttpResponse> {
    throw "method not allowed";
  }
}
