import { FastifyInstance } from "fastify";
import { PermissionController } from "infrastructure/fastify/controllers/permissions/permissions.controller";
import { DocsBuilder } from "infrastructure/fastify/validators/docs/docs.builder";

export async function PermissionsRouter(app: FastifyInstance) {
  const permissionsController = new PermissionController();
  const docBuilder = new DocsBuilder("Permissions");

  app.get("/", docBuilder.config(), permissionsController.create);
  app.post("/", docBuilder.config(), permissionsController.create);
  app.get("/:permission_id", docBuilder.config(), permissionsController.create);
  app.put("/:permission_id", docBuilder.config(), permissionsController.create);
  app.delete("/:permission_id", docBuilder.config(), permissionsController.create);
}
