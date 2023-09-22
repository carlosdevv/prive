import { AssetProps } from '@/app/(services)/asset/types'
import {
  useCreateAsset,
  useFetchCryptos,
  useFetchStocks
} from '@/app/(services)/asset/useAsset'
import { toast } from '@/hooks/useToast'
import { BASE_ROUTES, DASHBOARD_ROUTES } from '@/lib/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { ClassEnum } from '@prisma/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type CustomHookCreateAssetComponent = {
  refetchAssets: () => void
}

const createAssetSchema = z.object({
  name: z.string().nonempty('É necessário informar um ativo.'),
  amount: z.coerce
    .number({ invalid_type_error: 'Apenas números são permitidos.' })
    .nonnegative('Insira um valor positivo.'),
  goal: z.coerce
    .number({ invalid_type_error: 'Apenas números são permitidos.' })
    .nonnegative('A meta deve ser positiva.')
    .min(1, 'É necessário informar o objetivo')
    .max(100, 'O objetivo deve ter no máximo 100%.')
})

type CreateAssetFormData = z.infer<typeof createAssetSchema>

export const useCreateAssetComponent = ({
  refetchAssets
}: CustomHookCreateAssetComponent) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors }
  } = useForm<CreateAssetFormData>({
    resolver: zodResolver(createAssetSchema)
  })

  const searchParams = useSearchParams()
  const router = useRouter()

  const [assetClass, setAssetClass] = useState('RENDA_FIXA')
  const isOpenSheet: boolean = searchParams?.get('create-asset') ? true : false
  const currentPath = `${BASE_ROUTES.DASHBOARD}${DASHBOARD_ROUTES.ASSETS}`

  const { mutate: createAsset, isLoading: isLoadingCreateAsset } =
    useCreateAsset({
      onSuccess: () => {
        refetchAssets()
        handleCloseSheet()
      }
    })

  const {
    mutateAsync: fetchStocks,
    isLoading: isLoadingFetchStocks,
    reset: resetFetchStocks
  } = useFetchStocks({})

  const {
    mutateAsync: fetchCryptos,
    isLoading: isLoadingFetchCryptos,
    reset: resetFetchCryptos
  } = useFetchCryptos({})

  const handleOpenSheet = useCallback(
    () => router.push(`${currentPath}?create-asset=true`),
    [currentPath, router]
  )

  const handleCloseSheet = useCallback(
    () => router.push(currentPath),
    [currentPath, router]
  )

  const onSubmit = useCallback(
    async (data: CreateAssetFormData) => {
      try {
        if (assetClass === ClassEnum.CRYPTO) {
          await fetchCryptos([data.name.toUpperCase()]).then(value => {
            if (!value) {
              resetFetchCryptos()
              throw new Error()
            }
            const newAsset: AssetProps = {
              name: data.name,
              class: assetClass as ClassEnum,
              amount: data.amount,
              value: value.coins[0].value * data.amount,
              goal: data.goal
            }

            createAsset(newAsset)
            return
          })
        }

        if (assetClass === ClassEnum.RENDA_FIXA) {
          const newAsset: AssetProps = {
            name: data.name,
            class: assetClass as ClassEnum,
            value: data.amount,
            goal: data.goal
          }

          createAsset(newAsset)
          return
        }

        await fetchStocks([data.name.toUpperCase()]).then(value => {
          if (!value) {
            resetFetchStocks()
            throw new Error()
          }

          const newAsset: AssetProps = {
            name: data.name,
            class: assetClass as ClassEnum,
            amount: data.amount,
            value: value.result[0].value * data.amount,
            goal: data.goal
          }

          createAsset(newAsset)
          return
        })
      } catch (error) {
        toast({
          title: 'Algo deu errado.',
          description: `Não encontramos o ativo ${data.name.toUpperCase()}.`,
          variant: 'destructive'
        })
      }
    },
    [
      assetClass,
      fetchStocks,
      fetchCryptos,
      createAsset,
      resetFetchCryptos,
      resetFetchStocks
    ]
  )

  return {
    isOpenSheet,
    reset,
    handleSubmit,
    onSubmit,
    assetClass,
    setAssetClass,
    register,
    errors,
    clearErrors,
    isLoadingCreateAsset,
    isLoadingFetchStocks,
    isLoadingFetchCryptos,
    handleOpenSheet,
    handleCloseSheet
  }
}
