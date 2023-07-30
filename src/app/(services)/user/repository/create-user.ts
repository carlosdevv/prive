import { db } from '@/lib/database'
import { ClassEnum } from '@prisma/client'
import { hash } from 'bcryptjs'
import { ICreateUserDTO, UserSecureData } from '../types'

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

    const createDefaultGoals = await db.goal.createMany({
      data: [
        {
          class: ClassEnum.RENDA_FIXA,
          userId: newUser.id
        },
        {
          class: ClassEnum.ACAO,
          userId: newUser.id
        },
        {
          class: ClassEnum.FII,
          userId: newUser.id
        },
        {
          class: ClassEnum.STOCK,
          userId: newUser.id
        },
        {
          class: ClassEnum.REIT,
          userId: newUser.id
        },
        {
          class: ClassEnum.CRYPTO,
          userId: newUser.id
        }
      ]
    })

    const userSecureData: UserSecureData = {
      name: newUser.name,
      email: newUser.email,
      id: newUser.id,
      created_at: newUser.created_at,
      is_active: newUser.is_active,
      role: newUser.role,
      patrimony: newUser.patrimony
    }

    return userSecureData
  }
}
