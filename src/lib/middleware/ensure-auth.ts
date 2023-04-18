import { verify } from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'

export function ensureAuth(req: NextApiRequest, res: NextApiResponse) {
  const authToken = req.headers.authorization

  if (!authToken) {
    return res.status(401).json({
      message: 'Token is missing'
    })
  }

  const [, token] = authToken.split(' ')

  try {
    verify(token, process.env.JWT_SECRET!)

    return 
  } catch (error) {
    return res.status(401).json({
      message: 'Token is invalid'
    })
  }
}
