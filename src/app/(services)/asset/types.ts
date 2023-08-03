import { ClassEnum } from '@prisma/client'

export type AssetProps = {
  name: string
  class: ClassEnum
  amount?: number
  value?: number
  goal?: number
  userId: string
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
