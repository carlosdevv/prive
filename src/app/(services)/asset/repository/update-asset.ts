'use server'

import { db } from '@/lib/database'
import { getCurrentUser } from '@/lib/session'
import { ClassEnum } from '@prisma/client'
import { UpdateAssetParams } from '../types'

export async function UpdateAsset({ name, value, goal }: UpdateAssetParams) {
  const user = await getCurrentUser()
  if (!user) throw new Error('Usuário não encontrado.')

  const { id: userId } = user
  const findedAsset = await db.asset.findFirst({
    where: {
      userId: userId,
      name: name
    }
  })

  if (!findedAsset) throw new Error('Ativo não encontrado.')

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
