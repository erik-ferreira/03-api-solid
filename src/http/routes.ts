import { FastifyInstance } from "fastify"

import { profile } from "@/http/controllers/profile"
import { register } from "@/http/controllers/register"
import { authenticate } from "@/http/controllers/authenticate"
import { verifyJWT } from "./middlewares/verify-jwt"

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register)
  app.post("/session", authenticate)

  // Authenticated
  app.get("/me", { onRequest: [verifyJWT] }, profile)
}
