import z from "zod"
import fastify from "fastify"

import { appRoutes } from "./http/routes"

import { prisma } from "./lib/prisma"

export const app = fastify()

app.register(appRoutes)
