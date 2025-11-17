import type { User } from "../entities/user.js"
import type { UserRepository } from "../repositories/user-repository.js"

export class WithdrawFromUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string, amount: number): Promise<User> {
    if (amount <= 0) throw new Error("Amount must be greater than 0")

    const user = await this.userRepository.findById(userId)

    if (!user) throw new Error("Invalid user!")

    if (user.balance < amount) throw new Error("User with insufficient founds")

    user.balance -= amount

    return await this.userRepository.update({ id: userId, user })
  }
}
