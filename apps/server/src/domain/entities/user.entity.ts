export interface User {
  id: string
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export class UserEntity implements User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  static create(props: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User {
    return new UserEntity(
      crypto.randomUUID(),
      props.name,
      props.email,
      new Date(),
      new Date()
    )
  }
} 