import { CreateAsset } from '@/lib/controllers/asset/create-asset'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, classe, amount, value, goal } = req.body
    const createAsset = new CreateAsset()

    try {
      const asset = await createAsset.execute({
        name,
        class: classe,
        amount,
        value,
        goal
      })
      return res.status(200).json(asset)
    } catch (error: any) {
      return res.status(400).json({ message: error.message })
    }
  }
}
