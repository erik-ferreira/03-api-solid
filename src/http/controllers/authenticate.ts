import z from "zod"
import { FastifyReply, FastifyRequest } from "fastify"

import { AuthenticateUseCase } from "@/use-cases/authenticate"

import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { InvalidCredentialError } from "@/use-cases/errors/invalid-credential-error"

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  })

  const { email, password } = registerBodySchema.parse(request.body)

  try {
    const userRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(userRepository)

    await authenticateUseCase.execute({ email, password })
  } catch (error) {
    if (error instanceof InvalidCredentialError) {
      return reply.status(400).send()
    }

    throw error
  }

  return reply.status(201).send()
}
