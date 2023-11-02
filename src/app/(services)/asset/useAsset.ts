import { Asset } from '@prisma/client'
import {
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import {
  createAsset,
  deleteAsset,
  fetchUSDCotation,
  getAssets,
  updateAsset
} from '.'
import {
  CreateAssetBody,
  DeleteAssetParams,
  GetAssetsProps,
  UpdateAssetParams
} from './types'

export const useGetAssets = (
  props?: GetAssetsProps,
  options?: UseQueryOptions<Asset[]>
) => {
  return useQuery<Asset[]>(['getAssets'], () => getAssets(props), {
    ...options
  })
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

export const useFetchUSDCotation = (options?: UseQueryOptions<string>) =>
  useQuery<string>(['cotation-usd'], fetchUSDCotation, {
    ...options,
    staleTime: 1000 * 60 * 60 // 1 hour
  })
