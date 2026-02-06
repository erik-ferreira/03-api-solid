import { expect, describe, it, beforeEach } from "vitest"

import { FetchNearbyGymUseCase } from "./fetch-nearby-gyms"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"

let gymRepository: InMemoryGymsRepository
let sut: FetchNearbyGymUseCase

describe("Fetch Nearby Use Case", () => {
  beforeEach(async () => {
    gymRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymUseCase(gymRepository)
  })

  it("should be able to fetch nearby gyms", async () => {
    await gymRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: -3.7997271,
      longitude: -38.5112256,
    })

    await gymRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: -3.9038771,
      longitude: -38.3888408,
    })

    const { gyms } = await sut.execute({
      userLatitude: -3.7997271,
      userLongitude: -38.5112256,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })])
  })
})
