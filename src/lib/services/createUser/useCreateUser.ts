import { UserSecureData } from '@/lib/types/types'
import { AxiosError } from 'axios'
import { UseMutationOptions, useMutation } from 'react-query'
import { createUser } from '.'
import { CreateUserBody } from './types'

export const useCreateUser = (
  options?: UseMutationOptions<UserSecureData, AxiosError, CreateUserBody>
) => {
  return useMutation(createUser, { ...options })
}
