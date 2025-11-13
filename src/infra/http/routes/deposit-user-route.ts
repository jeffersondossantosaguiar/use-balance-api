import type { FastifyInstance } from "fastify"
import { z } from "zod"
import { DepositToUserUseCase } from "../../../domain/use-cases/deposit-to-user.js"
import { PrismaUserRepository } from "../../repositories/prisma-user-repository.js"

export function depositUserRoute(app: FastifyInstance) {
  app.put("/users/:userId/deposit", async (request, reply) => {
    const paramsSchema = z.object({
      userId: z.string()
    })
    const bodySchema = z.object({
      amount: z.number().int().positive()
    })

    const { userId } = paramsSchema.parse(request.params)
    const { amount } = bodySchema.parse(request.body)

    const userRepository = new PrismaUserRepository()
    const depositUser = new DepositToUserUseCase(userRepository)

    try {
      const user = await depositUser.execute(userId, amount)
      return reply.status(200).send(user)
    } catch (err: any) {
      return reply.status(400).send({ error: err.message })
    }
  })
}
