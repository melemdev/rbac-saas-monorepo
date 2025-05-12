import { FastifyInstance } from "fastify";
import { UserController } from "infrastructure/fastify/controllers/users/user.controller";
import { createUserSchema, updateUserSchema } from "infrastructure/fastify/schemas/user.schema";
import { DocsBuilder } from "infrastructure/fastify/validators/docs/docs.builder";

export async function UserRoutes(app: FastifyInstance) {
  const userController = new UserController();
  const userDocs = new DocsBuilder("Users");

  app.get("/", userDocs.config(), userController.index);
  app.post("/", userDocs.config({ requestBody: createUserSchema }), userController.create);
  app.get("/:user_id", userDocs.config(), userController.findOne);
  app.delete("/:user_id", userDocs.config(), userController.delete);
  app.put("/:user_id", userDocs.config({ requestBody: updateUserSchema }), userController.update);
}
