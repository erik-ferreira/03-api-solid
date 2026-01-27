import { compare, hash } from "bcryptjs"
import { describe, expect, it } from "vitest"

import { AuthenticateUseCase } from "./authenticate"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { InvalidCredentialError } from "./errors/invalid-credential-error"

describe("Authenticate Use Case", () => {
  it("should be able to authenticate", async () => {
    const usersRepository = new InMemoryUsersRepository()

    // sut - system under test - padrão utilizado de qual módulo esta sendo testado
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    })

    const { user } = await sut.execute({
      email: "johndoe@example.com",
      password: "123456",
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it("should be able to authenticate with wrong email", async () => {
    const usersRepository = new InMemoryUsersRepository()

    // sut - system under test - padrão utilizado de qual módulo esta sendo testado
    const sut = new AuthenticateUseCase(usersRepository)

    expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  it("should be able to authenticate with wrong password", async () => {
    const usersRepository = new InMemoryUsersRepository()

    // sut - system under test - padrão utilizado de qual módulo esta sendo testado
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password_hash: await hash("123456", 6),
    })

    expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "1234567",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
