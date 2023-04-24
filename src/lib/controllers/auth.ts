import {
  IAuthenticateUserDTO,
  UserResponse,
  UserSecureData
} from '@/lib/types/types'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { db } from '../database'

export class AuthenticateUser {
  async execute({ email, password }: IAuthenticateUserDTO) {
    const user = await db.user.findFirst({
      where: {
        email
      }
    })

    if (!user) {
      throw new Error('Email ou senha incorretos.')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Email ou senha incorretos.')
    }

    const userSecureData: UserSecureData = {
      name: user.name,
      email: user.email,
      id: user.id,
      created_at: user.created_at,
      is_active: user.is_active,
      role: user.role
    }

    const token = sign({ user: userSecureData }, process.env.JWT_SECRET!, {
      subject: user.id,
      expiresIn: '1h'
    })

    const refreshToken = sign({}, process.env.JWT_SECRET!, {
      subject: user.id,
      expiresIn: '30d'
    })

    const userResponse: UserResponse = {
      ...userSecureData,
      token,
      refreshToken
    }

    return userResponse
  }
}
