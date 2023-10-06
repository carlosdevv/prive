'use server'

import { db } from '@/lib/database'
import { getCurrentUser } from '@/lib/session'
import { Asset, ClassEnum } from '@prisma/client'

type GetAssetsProps = {
  className?: ClassEnum
}

export async function GetAssets({
  className
}: GetAssetsProps): Promise<Asset[]> {
  const user = await getCurrentUser()
  if (!user) throw new Error('Usuário não encontrado.')

  const { id: userId } = user

  const assets = await db.asset.findMany({
    where: {
      class: className ?? ClassEnum.RENDA_FIXA,
      userId: userId
    }
  })
  if (!assets) throw new Error('Ativos não encontrados.')

  return assets
}
