import { db } from '@/lib/database'
import { ClassEnum } from '@prisma/client'
import { AssetProps } from '../types'

export class CreateAsset {
  async execute({
    name,
    class: classe,
    amount,
    value,
    goal,
    userId
  }: AssetProps) {
    const alreadyExistsAsset = await db.asset.findFirst({
      where: {
        id: userId,
        name
      }
    })

    if (alreadyExistsAsset) {
      if (classe === ClassEnum.RENDA_FIXA) {
        await db.asset.update({
          where: {
            id: userId
          },
          data: {
            value: alreadyExistsAsset.value! + value!
          }
        })
      } else {
        await db.asset.update({
          where: {
            id: userId
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
        userId
      }
    })

    return newAsset
  }
}
