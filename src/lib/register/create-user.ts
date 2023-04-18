import { compare, hash } from 'bcryptjs'
import { db } from '../database'
import { ICreateUserDTO } from '../types/types'

export class CreateUser {
  async execute({ name, email, password, phone }: ICreateUserDTO) {
    const user = await db.user.findFirst({
      where: {
        email
      }
    })

    if (user) {
      throw new Error('User already exists!')
    }

    const passwordHash = await hash(password, 8)

    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        phone
      }
    })

    return newUser
  }
}
