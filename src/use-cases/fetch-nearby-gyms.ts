import { Gym } from "generated/prisma/browser"
import { GymsRepository } from "@/repositories/gyms-repository"

interface FetchNearbyGymUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymUseCase {
  constructor(private gymRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymUseCaseRequest): Promise<FetchNearbyGymUseCaseResponse> {
    const gyms = await this.gymRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}
