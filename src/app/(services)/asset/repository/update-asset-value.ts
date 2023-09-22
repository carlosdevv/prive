'use server'

import { db } from '@/lib/database'
import { getCurrentUser } from '@/lib/session'

export async function UpdateAssetValue(name: string, newValue: number) {
  const user = await getCurrentUser()
  if (!user) throw new Error('Usuário não encontrado.')

  const { id: userId } = user

  const asset = await db.asset.findFirst({
    where: {
      userId: userId,
      name: name
    }
  })

  if (!asset) return

  await db.asset.update({
    where: {
      id: asset.id
    },
    data: {
      value: newValue * (asset.amount ?? 1)
    }
  })
}
