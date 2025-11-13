import type { User } from "../entities/user.js"
import type { UserRepository } from "../repositories/user-repository.js"

export class DepositToUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string, amount: number): Promise<User> {
    if (amount <= 0) throw new Error("Deposit must be positive")

    const user = await this.userRepository.findById(userId)

    if (!user) throw new Error("User not found!")

    user.balance += amount

    return await this.userRepository.update({ id: userId, user })
  }
}
