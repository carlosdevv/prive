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
        userId: userId,
        name: name,
        class: classe
      }
    })

    if (alreadyExistsAsset) {
      if (classe === ClassEnum.RENDA_FIXA) {
        await db.asset.update({
          where: {
            id: alreadyExistsAsset.id
          },
          data: {
            value: alreadyExistsAsset.value! + value!,
            goal: goal
          }
        })
      } else {
        await db.asset.update({
          where: {
            id: alreadyExistsAsset.id
          },
          data: {
            amount: alreadyExistsAsset.amount! + amount!,
            goal: goal
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
