import { AxiosError } from 'axios'
import {
  MutationOptions,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery
} from 'react-query'
import { createAsset, fetchBTCCotation, fetchStocks, fetchUSDCotation } from '.'
import { CreateAssetBody, TickerResponse } from './types'

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

export const useFetchBTCCotation = (
  options?: UseQueryOptions<string, AxiosError>
) =>
  useQuery<string, AxiosError>(['cotation-btc'], () => fetchBTCCotation(), {
    ...options
  })

export const useFetchStocks = (
  options?: MutationOptions<TickerResponse, AxiosError, string[]>
) =>
  useMutation(['acoes'], fetchStocks, {
    ...options
  })
