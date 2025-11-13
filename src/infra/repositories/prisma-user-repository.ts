import { User } from "../../domain/entities/user.js"
import type { UserRepository } from "../../domain/repositories/user-repository.js"
import { prisma } from "../database/prisma/prisma-service.js"

export class PrismaUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    const { id, name, email, balance } = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        balance: user.balance
      }
    })

    return new User({ id, name, email, balance })
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) return null

    return new User({
      id: user.id,
      name: user.name,
      email: user.email,
      balance: user.balance
    })
  }
}
