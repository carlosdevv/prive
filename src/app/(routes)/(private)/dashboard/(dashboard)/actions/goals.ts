'use server'

import { UserSession } from '@/app/(services)/user/types'
import { db } from '@/lib/database'
import { ClassEnum } from '@prisma/client'

export async function GetGoals(user: UserSession) {
  return await db.goal.findMany({
    where: {
      userId: user.id
    }
  })
}

export async function UpdateGoal(
  user: UserSession,
  newGoal: number,
  classType: ClassEnum
) {
  const goal = await db.goal.findFirst({
    where: {
      userId: user.id,
      class: classType
    }
  })

  if (!goal) return

  await db.goal.update({
    where: {
      id: goal.id,
      class: classType
    },
    data: {
      goal: newGoal
    }
  })
}
