import z from "zod"
import { FastifyReply, FastifyRequest } from "fastify"

import { prisma } from "@/lib/prisma"

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  })

  console.log("Request body:", request.body)

  const { name, email, password } = registerBodySchema.parse(request.body)

  console.log("data:", { name, email, password })

  await prisma.user.create({
    data: { name, email, password_hash: password },
  })

  console.log("data:", { name, email, password })

  return reply.status(201).send()
}
