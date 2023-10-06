import { toast } from '@/hooks/useToast'
import api from '@/lib/api'
import { CreateAsset } from './repository/create-asset'
import { DeleteAsset } from './repository/delete-asset'
import { GetAssets } from './repository/get-assets'
import { UpdateAsset } from './repository/update-asset'
import {
  CreateAssetBody,
  CryptoResponse,
  DeleteAssetParams,
  GetAssetsProps,
  TickerResponse,
  UpdateAssetParams
} from './types'

export const getAssets = async (props?: GetAssetsProps) => {
  const assets = await GetAssets({ className: props?.class })

  return assets
}

export const createAsset = async (body: CreateAssetBody) => {
  try {
    await CreateAsset(body)
    toast({
      title: 'Sucesso.',
      description: 'Ativo criado com sucesso.'
    })
  } catch (error) {
    if (error instanceof Error) {
      toast({
        title: 'Algo deu errado.',
        description: error.message ?? 'Não foi possível criar o ativo.',
        variant: 'destructive'
      })
    }
  }

  return
}

export const deleteAsset = async ({ name }: DeleteAssetParams) => {
  try {
    await DeleteAsset({ name })
    toast({
      title: 'Sucesso.',
      description: 'Ativo removido com sucesso.'
    })
  } catch (error) {
    if (error instanceof Error) {
      toast({
        title: 'Erro.',
        description: error.message,
        variant: 'destructive'
      })
    }
  }
  return
}

export const updateAsset = async (body: UpdateAssetParams) => {
  try {
    await UpdateAsset(body)
    toast({
      title: 'Sucesso.',
      description: 'Ativo atualizado com sucesso.'
    })
  } catch (error) {
    if (error instanceof Error) {
      toast({
        title: 'Erro.',
        description: error.message,
        variant: 'destructive'
      })
    }
  }
  return
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
  const brapiToken = process.env.NEXT_PUBLIC_BRAPI_TOKEN
  const url = `https://brapi.dev/api/v2/crypto`

  const queryParams = {
    coin: coins.toString(),
    currency: 'BRL',
    token: brapiToken
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
  const brapiToken = process.env.NEXT_PUBLIC_BRAPI_TOKEN
  const url = `https://brapi.dev/api/quote/${tickers.toString()}`

  const queryParams = {
    range: '1d',
    interval: '1h',
    fundamental: false,
    dividends: false,
    token: brapiToken
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
