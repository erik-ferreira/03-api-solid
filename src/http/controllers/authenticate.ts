import z from "zod"
import { FastifyReply, FastifyRequest } from "fastify"

import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case"

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
    const authenticateUseCase = makeAuthenticateUseCase()

    await authenticateUseCase.execute({ email, password })
  } catch (error) {
    if (error instanceof InvalidCredentialError) {
      return reply.status(400).send()
    }

    throw error
  }

  return reply.status(201).send()
}
