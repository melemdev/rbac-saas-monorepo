import { User, UserEntity } from '../../domain/entities/user.entity'
import { UserRepository } from '../../domain/repositories/user-repository'

interface CreateUserRequest {
  name: string
  email: string
}

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(request: CreateUserRequest): Promise<User> {
    const { name, email } = request

    const userExists = await this.userRepository.findByEmail(email)

    if (userExists) {
      throw new Error('User already exists')
    }

    const user = UserEntity.create({
      name,
      email,
    })

    const createdUser = await this.userRepository.create(user)

    return createdUser
  }
} 