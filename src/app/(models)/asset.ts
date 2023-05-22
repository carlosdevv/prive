import { ClassEnum } from '@prisma/client'

export type AssetProps = {
  name: string
  class: ClassEnum
  amount?: number
  value?: number
  goal?: number
}
