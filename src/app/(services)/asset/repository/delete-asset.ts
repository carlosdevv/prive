import { db } from '@/lib/database'
import { DeleteAssetParams } from '../types'

export class DeleteAsset {
  async execute({ name, userId }: DeleteAssetParams) {
    const findedAsset = await db.asset.findFirst({
      where: {
        userId: userId,
        name: name
      }
    })

    if (findedAsset) {
      await db.asset.delete({
        where: {
          id: findedAsset.id
        }
      })

      return
    }

    throw new Error('Ativo não encontrado')
  }
}
