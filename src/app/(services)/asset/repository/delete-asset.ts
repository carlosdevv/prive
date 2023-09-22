'use server'

import { db } from '@/lib/database'
import { DeleteAssetParams } from '../types'
import { getCurrentUser } from '@/lib/session'

export async function DeleteAsset({ name }: DeleteAssetParams) {
  const user = await getCurrentUser()
  if (!user) throw new Error('Usuário não encontrado.')

  const { id: userId } = user
  const findedAsset = await db.asset.findFirst({
    where: {
      userId: userId,
      name: name
    }
  })

  if (!findedAsset) throw new Error('Ativo não encontrado')

  await db.asset.delete({
    where: {
      id: findedAsset.id
    }
  })
  return
}
