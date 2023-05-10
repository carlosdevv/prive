import { ClassEnum } from "@prisma/client"

export type ICreateAssetDTO = {
  name: string
  class: ClassEnum
  amount?: number
  value?: number
  goal?: number
}
