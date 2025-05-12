import { FastifyInstance } from "fastify";
import { AuthController } from "infrastructure/fastify/controllers/auth/auth.controller";
import { DocsBuilder } from "infrastructure/fastify/validators/docs/docs.builder";

export async function AuthRoutes(app: FastifyInstance) {
  const authController = new AuthController();
  const docBuilder = new DocsBuilder("Authentication");

  app.get("/sign-in", docBuilder.config(), authController.signIn);
  app.get("/sign-up", docBuilder.config(), authController.signUp);

  app.put("/logout", docBuilder.config(), authController.logout);
  app.post("/refresh", docBuilder.config(), authController.refreshAccessToken);

  app.post("/recovery", docBuilder.config(), authController.recoveryPassword);
  app.post("/reset", docBuilder.config(), authController.resetPassword);
}
