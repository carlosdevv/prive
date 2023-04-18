import { AuthenticateUser } from '@/lib/auth/auth'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email, password } = req.body
    const authenticateUser = new AuthenticateUser()

    try {
      const user = await authenticateUser.execute({ email, password })
      return res.status(200).json(user)
    } catch (error: any) {
      return res.status(400).json({ message: error.message })
    }
  }
}
