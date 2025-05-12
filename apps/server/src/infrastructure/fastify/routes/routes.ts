import { FastifyInstance } from "fastify";
import { CommonController } from "../controllers/_common/common.controller";
import { UserRoutes } from "./users/user.routes";
import { AuthRoutes } from "./auth/auth.routes";
import { GroupsRoutes } from "./groups/groups.routes";
import { PermissionsRouter } from "./permissions/permissions.routes";
import { PreferencesRouter } from "./preferences/preferences.routes";

export default async function Router(app: FastifyInstance) {
  app.register(AuthRoutes, { prefix: "/auth" });
  app.register(UserRoutes, { prefix: "/users" });
  app.register(GroupsRoutes, { prefix: "/groups" });
  app.register(PermissionsRouter, { prefix: "/permissions" });
  app.register(PreferencesRouter, { prefix: "/preferences" });
}
