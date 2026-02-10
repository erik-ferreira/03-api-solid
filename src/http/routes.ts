import { FastifyInstance } from "fastify"

import { profile } from "@/http/controllers/profile"
import { register } from "@/http/controllers/register"
import { authenticate } from "@/http/controllers/authenticate"

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", register)
  app.post("/session", authenticate)

  // Authenticated
  app.get("/me", profile)
}
