import { db } from '@/lib/database'
import { ClassEnum } from '@prisma/client'
import { UpdateAssetParams } from '../types'

export class UpdateAsset {
  async execute({ name, userId, value, goal }: UpdateAssetParams) {
    const findedAsset = await db.asset.findFirst({
      where: {
        userId: userId,
        name: name
      }
    })

    if (findedAsset) {
      if (findedAsset.class === ClassEnum.RENDA_FIXA) {
        await db.asset.update({
          where: {
            id: findedAsset.id
          },
          data: {
            value: value,
            goal: goal
          }
        })

        return
      }
      await db.asset.update({
        where: {
          id: findedAsset.id
        },
        data: {
          amount: value,
          goal: goal
        }
      })

      return
    }

    throw new Error('Ocorreu um erro ao editar o ativo.')
  }
}
