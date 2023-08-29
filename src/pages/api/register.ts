/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateUser } from '@/app/(services)/user/repository/create-user'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body
    const createUser = new CreateUser()

    try {
      const user = await createUser.execute({ name, email, password })
      return res.status(200).json(user)
    } catch (error: any) {
      return res.status(400).json({ message: error.message })
    }
  }
}
