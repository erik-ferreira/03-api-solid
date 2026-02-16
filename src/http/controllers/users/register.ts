import z from "zod"
import { FastifyReply, FastifyRequest } from "fastify"

import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case"

import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error"

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({ name, email, password })
  } catch (error) {
    console.log("erro register user", error)
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send()
    }

    throw error
  }

  return reply.status(201).send()
}
