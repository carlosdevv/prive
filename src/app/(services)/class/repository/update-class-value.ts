'use server'

import { db } from '@/lib/database'
import { ClassEnum } from '@prisma/client'

export async function UpdateClassValue(
  userId: string,
  className: ClassEnum,
  value: number,
  onCreateAsset?: boolean
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

  const updatedClassValue = await db.class.update({
    where: {
      id: findedClass.id
    },
    data: {
      value: onCreateAsset ? (findedClass.value ?? 0) + value : value
    }
  })

  if (!updatedClassValue)
    throw new Error('Ocorreu um erro ao atualizar o valor classe.')

  return
}
