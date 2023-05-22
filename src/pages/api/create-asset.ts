import { createAssetDB } from '@/app/(actions)/Asset/repository/create-asset'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { name, classe, amount, value, goal } = req.body

  try {
    const asset = await createAssetDB({
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
