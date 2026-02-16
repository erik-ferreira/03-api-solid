import { FastifyInstance } from "fastify"

import { refresh } from "./refresh"
import { profile } from "./profile"
import { register } from "./register"
import { authenticate } from "./authenticate"

import { verifyJWT } from "../../middlewares/verify-jwt"

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register)
  app.post("/session", authenticate)

  app.patch("/token/refresh", refresh)

  // Authenticated
  app.get("/me", { onRequest: [verifyJWT] }, profile)
}
