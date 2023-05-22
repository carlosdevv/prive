import api from '@/lib/api'
import { CreateAssetBody } from './types'

export const createAsset = async (body: CreateAssetBody) => {
  const url = '/api/create-asset'

  const { data } = await api.post(url, body)

  return data
}
