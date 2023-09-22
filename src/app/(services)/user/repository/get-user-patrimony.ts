'use server'

import { db } from '@/lib/database'

export async function GetUserPatrimony(userId: string) {
  const findedUser = await db.user.findFirstOrThrow({
    where: {
      id: userId
    }
  })

  if (findedUser) {
    const allClasses = await db.class.findMany({
      where: {
        userId: findedUser.id
      }
    })

    const patrimonySum = allClasses.reduce((acc, curr) => {
      return acc + (curr.value ?? 0)
    }, 0)

    await db.user.update({
      where: {
        id: findedUser.id
      },
      data: {
        patrimony: patrimonySum
      }
    })

    return findedUser
  }

  return
}
