'use server'

import { db } from '@/lib/database'
import { getCurrentUser } from '@/lib/session'
import { Asset } from '@prisma/client'

type GetAssetsProps = {
  assetId: string
}

export async function GetAsset({ assetId }: GetAssetsProps): Promise<Asset> {
  const user = await getCurrentUser()
  if (!user) throw new Error('Usuário não encontrado.')

  const { id: userId } = user

  const asset = await db.asset.findUnique({
    where: {
      id: assetId,
      userId: userId
    }
  })
  if (!asset) throw new Error('Ativo não encontrados.')

  return asset
}
