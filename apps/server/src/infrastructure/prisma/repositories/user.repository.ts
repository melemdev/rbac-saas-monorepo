import { User } from "domain/entities/user.entity";
import { UserRepository } from "domain/repositories/user-repository";

export class UserRepositoryPrisma implements UserRepository {
  constructor() {}

  create(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }

  findById(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  findByEmail(email: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  list(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }

  update(id: string, user: Partial<User>): Promise<User> {
    throw new Error("Method not implemented.");
  }

  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
