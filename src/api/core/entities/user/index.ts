import { messages } from 'api/core/constants'
import { BeforeInsert, Column, Entity, ModelBase, PrimaryGeneratedColumn } from 'api/core/framework/orm'
import { compare, encrypt } from 'api/core/utils/crypto'
import { ResourceConflictedException } from 'errors/exceptions/resource-conflict'
import { ResourceNotFoundException } from 'errors/exceptions/resource-not-found'

type SerializeResult = { id: number; name: string; email: string }

@Entity()
export class User extends ModelBase {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  serialize(): SerializeResult {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    }
  }

  @BeforeInsert()
  async hashPassword(): Promise<User> {
    return this.password ? this.setPassword(this.password) : this
  }

  async setPassword(password: string): Promise<User> {
    this.password = await encrypt({ data: password, strength: 8 })
    return this
  }

  async checkPassword(password: string): Promise<boolean> {
    return await compare(password, this.password)
  }

  static async getByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } })
  }

  static async getByEmailOrFail(email: string): Promise<User> {
    return await User.findOneOrFail({ where: { email } })
  }

  static async getByIdOrFail(id: number): Promise<User> {
    try {
      return await User.findOneOrFail({ where: { id } })
    } catch (err) {
      throw new ResourceNotFoundException(messages.USER_DOES_NOT_EXIST)
    }
  }

  static async validateUniqueEmail(email: string): Promise<void> {
    const user = await this.getByEmail(email)
    if (user) {
      throw new ResourceConflictedException(messages.EMAIL_ALREADY_EXISTS)
    }
  }
}
