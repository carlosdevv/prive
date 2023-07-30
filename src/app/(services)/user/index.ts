import api from '@/lib/api'
import { CreateUserBody } from './types'
import { UserSecureData } from '@/lib/controllers/user/types'

export const createUser = async (body: CreateUserBody) => {
  const url = '/api/register'

  const { data } = await api.post(url, body)

  const formmatData: UserSecureData = {
    id: data.id,
    name: data.name,
    email: data.email,
    created_at: data.created_at,
    is_active: data.is_active,
    role: data.role
  }

  return formmatData
}
