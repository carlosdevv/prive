'use server'

import { UserSession } from '@/app/(services)/user/types'
import { db } from '@/lib/database'

export async function GetPatrimony(user: UserSession) {
  const findedUser = await db.user.findFirst({
    where: {
      id: user.id
    }
  })

  if (!findedUser) {
    throw new Error('Usuário não encontrado')
  }

  return findedUser.patrimony
}
