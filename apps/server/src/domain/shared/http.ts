export class HttpResponse {
  protected constructor(
    protected readonly statusCode: number,
    protected readonly data: unknown,
    protected readonly message?: string
  ) {}

  protected static ok<T>(data: T, message?: string): HttpResponse {
    return new HttpResponse(200, data, message);
  }

  protected static created<T>(data: T, message?: string): HttpResponse {
    return new HttpResponse(201, data, message);
  }

  protected static noContent(): HttpResponse {
    return new HttpResponse(204, undefined);
  }

  protected static badRequest(message: string): HttpResponse {
    return new HttpResponse(400, null, message);
  }

  protected static unauthorized(
    message: string = "Unauthorized"
  ): HttpResponse {
    return new HttpResponse(401, null, message);
  }

  protected static forbidden(message: string = "Forbidden"): HttpResponse {
    return new HttpResponse(403, null, message);
  }

  protected static notFound(message: string = "Not Found"): HttpResponse {
    return new HttpResponse(404, null, message);
  }

  protected static serverError(
    message: string = "Internal Server Error"
  ): HttpResponse {
    return new HttpResponse(500, null, message);
  }

  public getStatusCode(): number {
    return this.statusCode;
  }

  public getData(): unknown {
    return this.data;
  }

  public getMessage(): string | undefined {
    return this.message;
  }

  public toJSON() {
    return {
      statusCode: this.statusCode,
      data: this.data,
      message: this.message,
    };
  }
}
