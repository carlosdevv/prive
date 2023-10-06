'use server'

import { UserSession } from '@/app/(services)/user/types'
import { db } from '@/lib/database'
import { ClassEnum } from '@prisma/client'

export async function GetUserClasses(user: UserSession) {
  return await db.class.findMany({
    where: {
      userId: user.id
    }
  })
}

export async function UpdateClassGoal(
  user: UserSession,
  newGoal: number,
  classType: ClassEnum
) {
  const goal = await db.class.findFirst({
    where: {
      userId: user.id,
      class: classType
    }
  })

  if (!goal) return

  await db.class.update({
    where: {
      id: goal.id,
      class: classType
    },
    data: {
      goal: newGoal
    }
  })
}
