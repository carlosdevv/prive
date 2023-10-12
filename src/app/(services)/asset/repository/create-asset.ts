'use server'

import { db } from '@/lib/database'
import { getCurrentUser } from '@/lib/session'
import { ClassEnum } from '@prisma/client'
import { UpdateClassValue } from '../../class/repository/update-class-value'
import { CreateAssetBody } from '../types'

export async function CreateAsset(body: CreateAssetBody) {
  const user = await getCurrentUser()
  if (!user) throw new Error('Usuário não encontrado.')

  const { id: userId } = user
  const { name, class: classe, amount, value, goal } = body

  const alreadyExistsAsset = await db.asset.findFirst({
    where: {
      userId: userId,
      name: name,
      class: classe
    }
  })

  if (alreadyExistsAsset) {
    if (classe === ClassEnum.RENDA_FIXA) {
      await db.asset.update({
        where: {
          id: alreadyExistsAsset.id
        },
        data: {
          value: (alreadyExistsAsset.value ?? 0) + (value ?? 0),
          goal: goal
        }
      })
    } else {
      await db.asset.update({
        where: {
          id: alreadyExistsAsset.id
        },
        data: {
          amount: (alreadyExistsAsset.amount ?? 0) + (amount ?? 0),
          goal: goal
        }
      })
    }

    if (value) {
      await UpdateClassValue(userId, classe, value)
    }

    return
  }

  const newAsset = await db.asset.create({
    data: {
      name,
      class: classe,
      amount,
      value,
      goal,
      userId
    }
  })

  if (!newAsset) throw new Error('Não foi possível criar o ativo.')

  return
}
