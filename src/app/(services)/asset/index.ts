import api from '@/lib/api'
import { CreateAssetBody, TickerResponse } from './types'

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

export const fetchBTCCotation = async () => {
  const url = `https://economia.awesomeapi.com.br/last/BTC-BRL`

  const { data } = await api.get(url)

  const formmatedData = {
    value: data.BTCBRL.ask
  }

  return formmatedData.value
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
