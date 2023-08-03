import api from '@/lib/api'
import { CreateAssetBody, CryptoResponse, TickerResponse } from './types'

export const createAsset = async (body: CreateAssetBody) => {
  const url = '/api/create-asset'

  await api.post(url, body)
}

export const fetchUSDCotation = async () => {
  const url = `https://economia.awesomeapi.com.br/last/USD-BRL`

  const { data } = await api.get(url)

  const formmatedData = {
    value: data.USDBRL.ask
  }

  return formmatedData.value
}

export const fetchCryptos = async (coins: string[]) => {
  const url = `https://brapi.dev/api/v2/crypto`

  const queryParams = {
    coin: coins.toString(),
    currency: 'BRL'
  }

  const { data } = await api.get(url, {
    params: queryParams
  })

  const formmatedData: CryptoResponse = {
    coins: coins.map((coin, index) => {
      return {
        coin,
        value: data.coins[index].regularMarketPrice
      }
    })
  }

  return formmatedData
}

export const fetchStocks = async (tickers: string[]) => {
  const url = `https://brapi.dev/api/quote/${tickers.toString()}`

  const queryParams = {
    range: '1d',
    interval: '1h',
    fundamental: false,
    dividends: false
  }

  const { data } = await api.get(url, {
    params: queryParams
  })

  const formmatedData: TickerResponse = {
    result: tickers.map((ticker, index) => {
      return {
        ticker: ticker,
        value: data.results[index].regularMarketPrice
      }
    })
  }

  return formmatedData
}
