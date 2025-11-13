import type { FastifyInstance } from "fastify"
import { z } from "zod"
import { CreateUserUseCase } from "../../../domain/use-cases/create-user.js"
import { PrismaUserRepository } from "../../repositories/prisma-user-repository.js"

export async function createUserRoute(app: FastifyInstance) {
  app.post("/users", async (request, reply) => {
    const bodySchema = z.object({
      name: z.string(),
      email: z.email()
    })

    const { name, email } = bodySchema.parse(request.body)

    const userRepository = new PrismaUserRepository()
    const createUser = new CreateUserUseCase(userRepository)

    try {
      const user = await createUser.execute({ name, email })
      return reply.status(201).send(user)
    } catch (err: any) {
      return reply.status(400).send({ error: err.message })
    }
  })
}
