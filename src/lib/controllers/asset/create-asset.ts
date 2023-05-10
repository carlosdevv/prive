import { db } from '@/lib/database'
import { ICreateAssetDTO } from './types'
import { getCurrentUser } from '@/lib/session'
import { ClassEnum } from '@prisma/client'

export class CreateAsset {
  async execute({ name, class: classe, amount, value, goal }: ICreateAssetDTO) {
    const user = await getCurrentUser()

    const alreadyExistsAsset = await db.asset.findFirst({
      where: {
        id: user?.id,
        name
      }
    })

    if (alreadyExistsAsset) {
      if (classe === ClassEnum.RENDA_FIXA) {
        await db.asset.update({
          where: {
            id: user?.id
          },
          data: {
            value: alreadyExistsAsset.value! + value!
          }
        })
      } else {
        await db.asset.update({
          where: {
            id: user?.id
          },
          data: {
            amount: alreadyExistsAsset.amount! + amount!
          }
        })
      }

      return alreadyExistsAsset
    }

    const newAsset = await db.asset.create({
      data: {
        name,
        class: classe,
        amount,
        value,
        goal,
        userId: user!.id
      }
    })

    return newAsset
  }
}
