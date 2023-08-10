import { UpdateAsset } from '@/app/(services)/asset/repository/update-asset'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function PATCH(req: NextApiRequest, res: NextApiResponse) {
  const { name, userId, value, goal } = req.body
  const updateAsset = new UpdateAsset()

  try {
    await updateAsset.execute({
      name,
      userId,
      value,
      goal
    })
    return res.status(200).json({ message: 'Ativo atualizado com sucesso!' })
  } catch (error: any) {
    return res.status(400).json({ message: error.message })
  }
}
