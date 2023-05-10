import { RefreshToken } from '@/lib/controllers/auth/refresh-token'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { refreshToken, userId } = req.body
    const token = new RefreshToken()

    try {
      const newToken = await token.execute({ refreshToken, userId })
      return res.status(200).json({ token: newToken })
    } catch (error: any) {
      return res.status(400).json({ message: error.message })
    }
  }
}
