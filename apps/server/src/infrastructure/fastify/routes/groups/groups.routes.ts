import { FastifyInstance } from "fastify";
import { GroupsController } from "infrastructure/fastify/controllers/groups/groups.controller";
import { DocsBuilder } from "infrastructure/fastify/validators/docs/docs.builder";

export async function GroupsRoutes(app: FastifyInstance) {
  const groupsController = new GroupsController();
  const docBuilder = new DocsBuilder("Groups");

  app.get("/", docBuilder.config(), groupsController.index);
  app.post("/", docBuilder.config(), groupsController.create);
  app.get("/:group_id", docBuilder.config(), groupsController.findOne);
  app.put("/:group_id", docBuilder.config(), groupsController.update);
  app.delete("/:group_id", docBuilder.config(), groupsController.delete);
  app.put("/:group_id/add_members", docBuilder.config({ extraTags: ["Users"] }), groupsController.addMember);
  app.put("/:group_id/remove_members", docBuilder.config({ extraTags: ["Users"] }), groupsController.removeMember);
}
