import { sign } from 'jsonwebtoken'
import { IRefreshTokenDTO, UserSecureData } from './types'
import { db } from '@/lib/database'

export class RefreshToken {
  async execute({ refreshToken, userId }: IRefreshTokenDTO) {
    const user = await db.user.findFirst({
      where: {
        id: userId
      }
    })

    if (!user) {
      throw new Error('User not found!')
    }

    const userSecureData: UserSecureData = {
      name: user.name,
      email: user.email,
      id: user.id,
      created_at: user.created_at,
      is_active: user.is_active,
      role: user.role,
      patrimony: user.patrimony
    }

    const token = sign({ user: userSecureData }, process.env.JWT_SECRET!, {
      subject: user.id,
      expiresIn: '1h'
    })

    return token
  }
}
