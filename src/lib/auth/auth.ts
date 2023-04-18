import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { db } from '../database'
import { IAuthenticateUserDTO } from '../types/types'

export class AuthenticateUser {
  async execute({ email, password }: IAuthenticateUserDTO) {
    const user = await db.user.findFirst({
      where: {
        email
      }
    })

    if (!user) {
      throw new Error('Email or password incorrect!')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Email or password incorrect!')
    }

    const token = sign({ user }, process.env.JWT_SECRET!, {
      subject: user.id,
      expiresIn: '1h'
    })

    return { user, token }
  }
}
