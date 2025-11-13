import { User } from "../entities/user.js"
import type { UserRepository } from "../repositories/user-repository.js"

interface CreateUserRequest {
  name: string
  email: string
}

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ name, email }: CreateUserRequest): Promise<User> {
    const userAlreadyExists = await this.userRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new Error("User already exists")
    }

    const user = new User({ name, email })
    return await this.userRepository.create(user)
  }
}
