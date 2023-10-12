'use server'

import { db } from '@/lib/database'
import { ClassEnum } from '@prisma/client'

export async function UpdateClassValue(
  userId: string,
  className: ClassEnum,
  value: number
) {
  const findedClass = await db.class.findFirst({
    where: {
      class: className,
      userId: userId
    }
  })

  if (!findedClass) {
    throw new Error('Classe não encontrada')
  }

  await db.class.update({
    where: {
      id: findedClass.id
    },
    data: {
      value: value
    }
  })

  return
}
