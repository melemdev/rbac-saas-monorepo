import { UserRepository } from "domain/repositories/user-repository";
import { UseCase } from "../base-use-case";

export interface GetUsersInput {
  page?: number;
  limit?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface GetUsersOutput {
  users: User[];
  total: number;
}

export class GetUsersUseCase implements UseCase<GetUsersInput, GetUsersOutput> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: GetUsersInput): Promise<GetUsersOutput> {
    // This is just an example implementation
    // In a real application, this would interact with your repository layer
    return {
      users: [],
      total: 0,
    };
  }
}
