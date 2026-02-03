import { Gym, Prisma } from "generated/prisma/browser"
import { GymCreateInput } from "generated/prisma/models"

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  create(data: GymCreateInput): Promise<Gym>
}
