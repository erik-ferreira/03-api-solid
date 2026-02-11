import { prisma } from "@/lib/prisma"
import "dotenv/config"
import { execSync } from "node:child_process"
import { randomUUID } from "node:crypto"

import type { Environment } from "vitest/environments"

function generateDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Please provide a DATABASE_URL env variable")
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set("schema", schema)

  return url.toString()
}

export default <Environment>{
  name: "prisma",
  viteEnvironment: "ssr",
  // function setup execute when start tests - create database
  async setup() {
    const schema = randomUUID()
    const databaseUrl = generateDatabaseUrl(schema)

    console.log(databaseUrl)

    process.env.DATABASE_URL = databaseUrl

    // to execute commands by terminal
    // esse comando vai executar todas as migrations dentro do novo banco de dados
    // this command will execute all migrations within the new database
    execSync("npx prisma migrate deploy")

    return {
      // function teardown execute when complete tests - delete database
      async teardown() {
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXITS ${schema} CASCADE`)

        await prisma.$disconnect()
      },
    }
  },
}
