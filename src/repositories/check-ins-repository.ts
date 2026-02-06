import { CheckIn, Prisma } from "generated/prisma/browser"

export interface CheckInsRepository {
  save(checkIn: CheckIn): Promise<CheckIn>
  findById(id: string): Promise<CheckIn | null>
  countByUserId(userId: string): Promise<number>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
}
