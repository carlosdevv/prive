import { AxiosError } from 'axios'
import {
  MutationOptions,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery
} from 'react-query'
import { createAsset, fetchCryptos, fetchStocks, fetchUSDCotation } from '.'
import { CreateAssetBody, CryptoResponse, TickerResponse } from './types'

export const useCreateAsset = (
  options?: UseMutationOptions<void, AxiosError, CreateAssetBody>
) => {
  return useMutation(createAsset, { ...options })
}

export const useFetchUSDCotation = (
  options?: UseQueryOptions<string, AxiosError>
) =>
  useQuery<string, AxiosError>(['cotation-usd'], () => fetchUSDCotation(), {
    ...options
  })

export const useFetchCryptos = (
  options?: MutationOptions<CryptoResponse, AxiosError, string[]>
) =>
  useMutation(['cryptos'], fetchCryptos, {
    ...options
  })

export const useFetchStocks = (
  options?: MutationOptions<TickerResponse, AxiosError, string[]>
) =>
  useMutation(['stocks'], fetchStocks, {
    ...options
  })
