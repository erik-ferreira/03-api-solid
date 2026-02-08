import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-repository"
import { CheckInUseCase } from "../check-in"

export function makeCheckInuseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymRepository()

  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return useCase
}
