import { CheckIn, Prisma } from "generated/prisma/browser"

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
