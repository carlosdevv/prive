import { AxiosError } from 'axios'
import {
  MutationOptions,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery
} from 'react-query'
import {
  createAsset,
  deleteAsset,
  fetchCryptos,
  fetchStocks,
  fetchUSDCotation,
  getAssets,
  updateAsset
} from '.'
import {
  CreateAssetBody,
  CryptoResponse,
  DeleteAssetParams,
  GetAssetsProps,
  TickerResponse,
  UpdateAssetParams
} from './types'
import { Asset } from '@prisma/client'

export const useGetAssets = (
  options?: UseMutationOptions<Asset[], AxiosError, GetAssetsProps>
) => {
  return useMutation(getAssets, { ...options })
}

export const useCreateAsset = (
  options?: UseMutationOptions<void, AxiosError, CreateAssetBody>
) => {
  return useMutation(createAsset, { ...options })
}

export const useUpdateAsset = (
  options?: UseMutationOptions<void, AxiosError, UpdateAssetParams>
) => {
  return useMutation(updateAsset, { ...options })
}

export const useDeleteAsset = (
  options?: UseMutationOptions<void, AxiosError, DeleteAssetParams>
) => {
  return useMutation(deleteAsset, { ...options })
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
