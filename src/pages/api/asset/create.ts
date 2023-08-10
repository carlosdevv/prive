import { CreateAsset } from '@/app/(services)/asset/repository/create-asset'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { name, class: classe, amount, value, goal, userId } = req.body
  const creteAsset = new CreateAsset()

  try {
    await creteAsset.execute({
      name,
      class: classe,
      amount,
      value,
      goal,
      userId
    })
    return res.status(200).json({ message: 'Ativo criado com sucesso!' })
  } catch (error: any) {
    return res.status(400).json({ message: error.message })
  }
}
