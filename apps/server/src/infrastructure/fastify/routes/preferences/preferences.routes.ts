import { FastifyInstance } from "fastify";
import { PreferenceController } from "infrastructure/fastify/controllers/preferences/preferences.controller";
import { DocsBuilder } from "infrastructure/fastify/validators/docs/docs.builder";

export async function PreferencesRouter(app: FastifyInstance) {
  const preferencesController = new PreferenceController();
  const docsBuilder = new DocsBuilder("Preferences");

  app.get("/", docsBuilder.config(), preferencesController.index);
  app.post("/", docsBuilder.config(), preferencesController.index);
  app.get("/:preference_id", docsBuilder.config(), preferencesController.index);
  app.put("/:preference_id", docsBuilder.config(), preferencesController.index);
  app.delete("/:preference_id", docsBuilder.config(), preferencesController.index);
}
