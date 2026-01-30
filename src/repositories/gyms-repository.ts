import { Gym } from "generated/prisma/browser"

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
}
