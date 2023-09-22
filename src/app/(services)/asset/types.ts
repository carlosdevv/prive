import { ClassEnum } from '@prisma/client'

export type CommonResponse = {
  message: string
}

export type GetAssetsProps = {
  class?: ClassEnum
}

export type AssetProps = {
  name: string
  class: ClassEnum
  amount?: number
  value?: number
  goal?: number
}

export type AssetDTO = {
  name: string
  value?: number | null
  amount?: number | null
  goal: number | null
  price?: number
  currentGoal: number
  dif: number
  aporte: number
  isBuy: boolean
}

export type CreateAssetBody = AssetProps

export enum CoinOptions {
  USD = 'USD-BRL',
  BTC = 'BTC-BRL'
}

export type TickerResponse = {
  result: {
    ticker: string
    value: number
  }[]
}

export type CryptoResponse = {
  coins: {
    coin: string
    value: number
  }[]
}

export type DeleteAssetParams = {
  name: string
}

export type UpdateAssetParams = {
  name: string
  value: number
  goal: number
}
