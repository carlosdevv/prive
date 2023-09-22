'use server'

import { db } from '@/lib/database'
import { getCurrentUser } from '@/lib/session'

export async function UpdateUserPatrimony(patrimony: number) {
  const user = await getCurrentUser()
  if (!user) throw new Error('Usuário não encontrado.')

  const { id: userId } = user
  const findedUser = await db.user.findFirst({
    where: {
      id: userId
    }
  })

  if (!findedUser) {
    throw new Error('Usuário não encontrado')
  }

  await db.user.update({
    where: {
      id: findedUser.id
    },
    data: {
      patrimony: patrimony
    }
  })
}
