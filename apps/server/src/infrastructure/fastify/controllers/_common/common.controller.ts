import { randomUUID } from "crypto";
import { IController } from "domain/shared/controller";
import { HttpResponse } from "domain/shared/http";
import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyResponseAdapter } from "infrastructure/fastify/handlers";
import { z } from "zod";

const productSchema = z.object({
  id: z.string(),
  title: z.string(),
  price: z.number(),
});

type Product = z.infer<typeof productSchema>;

export class CommonController extends IController<FastifyRequest, FastifyReply> {
  async create(request: FastifyRequest, reply: FastifyReply): Promise<HttpResponse> {
    const products: Product[] = [
      {
        id: randomUUID(),
        price: 100,
        title: "Calça",
      },
    ];

    return FastifyResponseAdapter.List<Product>(reply, {
      items: products,
      schema: productSchema,
      message: "Product retrieved successfully",
      pagination: {
        limit: 100,
        page: 100,
        total: products.length,
        totalPages: 10,
      },
    });
  }

  async delete(request: FastifyRequest, reply: FastifyReply): Promise<HttpResponse> {
    return FastifyResponseAdapter.Ok(reply, 'Product has been deleted')
  }
}
