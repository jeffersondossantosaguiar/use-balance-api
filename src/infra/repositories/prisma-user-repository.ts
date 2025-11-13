import { User } from "../../domain/entities/user.js"
import type { UserRepository } from "../../domain/repositories/user-repository.js"
import { prisma } from "../database/prisma/prisma-service.js"

export class PrismaUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } })

    if (!user) return null

    return new User({
      id: user.id,
      name: user.name,
      email: user.email,
      balance: user.balance
    })
  }

  async update({
    id,
    user
  }: {
    id: string
    user: Pick<User, "balance" | "name">
  }): Promise<User> {
    const userUpdated = await prisma.user.update({
      data: {
        name: user.name,
        balance: user.balance
      },
      where: { id }
    })

    return new User(userUpdated)
  }

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
