import { beforeEach, describe, expect, it, afterEach, vi } from "vitest"

import { CheckInUseCase } from "./check-in"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { Decimal } from "@prisma/client/runtime/index-browser"
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error"

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe("Register Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: "gym-01",
      title: "Typescript",
      description: "",
      phone: "",
      latitude: new Decimal(-3.7917793),
      longitude: new Decimal(-38.5165226),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -3.7917793,
      userLongitude: -38.5165226,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2026, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -3.7917793,
      userLongitude: -38.5165226,
    })

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -3.7917793,
        userLongitude: -38.5165226,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2026, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -3.7917793,
      userLongitude: -38.5165226,
    })

    vi.setSystemTime(new Date(2026, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -3.7917793,
      userLongitude: -38.5165226,
    })

    await expect(checkIn.id).toEqual(expect.any(String))
  })

  it("should not be able to check in on distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-02",
      title: "React",
      description: "",
      phone: "",
      latitude: new Decimal(-3.7917793),
      longitude: new Decimal(-38.5165226),
    })

    await expect(() =>
      sut.execute({
        gymId: "gym-02",
        userId: "user-01",
        userLatitude: -3.7927642,
        userLongitude: -38.4860098,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
