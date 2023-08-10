import { DeleteAsset } from '@/app/(services)/asset/repository/delete-asset'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function DELETE(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, userId } = req.query
  const deleteAsset = new DeleteAsset()

  try {
    await deleteAsset.execute({
      name: name as string,
      userId: userId as string
    })
    return res.status(200).json({ message: 'Ativo deletado com sucesso!' })
  } catch (error: any) {
    return res.status(400).json({ message: error.message })
  }
}
