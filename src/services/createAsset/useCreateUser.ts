import { UserSecureData } from '@/lib/controllers/user/types'
import { AxiosError } from 'axios'
import { UseMutationOptions, useMutation } from 'react-query'
import { createAsset } from '.'
import { CreateAssetBody } from './types'

export const useCreateAsset = (
  options?: UseMutationOptions<void, AxiosError, CreateAssetBody>
) => {
  return useMutation(createAsset, { ...options })
}
