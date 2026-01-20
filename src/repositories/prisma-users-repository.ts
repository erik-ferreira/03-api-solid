import { prisma } from "@/lib/prisma"

import * as Prisma from "generated/prisma/models"

export class PrismaUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data })

    return user
  }
}
