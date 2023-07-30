import { AxiosError } from 'axios'
import { UseQueryOptions, useQuery } from 'react-query'
import { fetchBTCCotation, fetchUSDCotation } from '.'

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
