import { beforeEach, describe, expect, it, afterEach, vi } from "vitest"

import { CheckInUseCase } from "./check-in"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history"

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe("Fetch User Check-in History Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)

    // await gymsRepository.create({
    //   id: "gym-01",
    //   title: "Typescript",
    //   description: "",
    //   phone: "",
    //   latitude: new Decimal(-3.7917793),
    //   longitude: new Decimal(-38.5165226),
    // })
  })

  it("should be able to check in", async () => {
    await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    })

    await checkInsRepository.create({
      gym_id: "gym-02",
      user_id: "user-01",
    })

    const { checkIns } = await sut.execute({
      userId: "user-01",
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-01" }),
      expect.objectContaining({ gym_id: "gym-02" }),
    ])
  })
})
