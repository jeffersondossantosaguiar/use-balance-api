import type { User } from "../entities/user.js"

export interface UserRepository {
  create(user: User): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  update({
    id,
    user
  }: {
    id: string
    user: Pick<User, "balance" | "name">
  }): Promise<User>
}
