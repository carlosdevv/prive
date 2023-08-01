'use server'

import { db } from '@/lib/database'
import { getCurrentUser } from '@/lib/session'
import { UserSession } from '../../user/types'

export async function handleGetAssets(user: UserSession) {

  return await db.asset.findMany({
    where: {
      userId: user?.id
    }
  })
}
