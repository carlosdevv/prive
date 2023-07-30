import { ClassEnum } from '@prisma/client'

export type AssetProps = {
  name: string
  class: ClassEnum
  amount?: number
  value?: number
  goal?: number
}

export type AssetDTO = {
  name: string
  value: number | null
  amount?: number | null
  goal: number | null
  price?: number
  currentGoal: number
  dif: number
  aporte: number
  isBuy: boolean
}

export type CreateAssetBody = AssetProps
