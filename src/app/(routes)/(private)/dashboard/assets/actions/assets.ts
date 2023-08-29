'use server'

import { UserSession } from '@/app/(services)/user/types'
import { db } from '@/lib/database'

export async function GetAssets(user: UserSession) {
  return await db.asset.findMany({
    where: {
      userId: user?.id
    }
  })
}

export async function UpdateAssetValue(
  user: UserSession,
  name: string,
  newValue: number
) {
  const asset = await db.asset.findFirst({
    where: {
      userId: user?.id,
      name: name
    }
  })

  if (!asset) return

  await db.asset.update({
    where: {
      id: asset.id
    },
    data: {
      value: newValue * (asset.amount ?? 0)
    }
  })
}
