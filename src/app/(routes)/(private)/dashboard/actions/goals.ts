'use server'

import { UserSession } from '@/app/(services)/user/types'
import { db } from '@/lib/database'

export async function GetGoals(user: UserSession) {
  return await db.goal.findMany({
    where: {
      userId: user?.id
    }
  })
}
