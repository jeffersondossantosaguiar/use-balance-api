import type { FastifyInstance } from "fastify"
import { z } from "zod"
import { WithdrawFromUserUseCase } from "../../../domain/use-cases/withdraw-from-user.js"
import { PrismaUserRepository } from "../../repositories/prisma-user-repository.js"

export function withdrawUserRoute(app: FastifyInstance) {
  app.put("/users/:userId/withdraw", async (request, reply) => {
    const paramsSchema = z.object({
      userId: z.string()
    })
    const bodySchema = z.object({
      amount: z.number().int().positive()
    })

    const { userId } = paramsSchema.parse(request.params)
    const { amount } = bodySchema.parse(request.body)

    const userRepository = new PrismaUserRepository()
    const depositUser = new WithdrawFromUserUseCase(userRepository)

    try {
      const user = await depositUser.execute(userId, amount)
      return reply.status(200).send(user)
    } catch (err: any) {
      return reply.status(400).send({ error: err.message })
    }
  })
}
