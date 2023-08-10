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
