import { hash } from 'bcryptjs'
import { ICreateUserDTO, UserSecureData } from './types'
import { db } from '@/lib/database'

export class CreateUser {
  async execute({ name, email, password }: ICreateUserDTO) {
    const user = await db.user.findFirst({
      where: {
        email
      }
    })

    if (user) {
      throw new Error('Usuário já cadastrado.')
    }

    const passwordHash = await hash(password, 8)

    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: passwordHash
      }
    })

    const userSecureData: UserSecureData = {
      name: newUser.name,
      email: newUser.email,
      id: newUser.id,
      created_at: newUser.created_at,
      is_active: newUser.is_active,
      role: newUser.role
    }

    return userSecureData
  }
}
