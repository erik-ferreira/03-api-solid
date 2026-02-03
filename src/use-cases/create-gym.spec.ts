import { beforeEach, describe, expect, it } from "vitest"

import { CreateGymUseCase } from "./create-gym"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"

let gymRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe("Register Use Case", () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymRepository)
  })

  it("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: "Javascript Gym",
      description: null,
      phone: null,
      latitude: -3.7917793,
      longitude: -38.5165226,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
