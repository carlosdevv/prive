import { fetchCryptos, fetchStocks } from '@/app/(services)/asset'
import { AssetProps } from '@/app/(services)/asset/types'
import { useCreateAsset } from '@/app/(services)/asset/useAsset'
import { useAssetContext } from '@/contexts/useAssetContext'
import { toast } from '@/hooks/useToast'
import { zodResolver } from '@hookform/resolvers/zod'
import { ClassEnum } from '@prisma/client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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

export const useCreateAssetComponent = () => {
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
  const pathname = usePathname()
  const router = useRouter()
  const { tabSelected, queryClient, handleRefetchAssetsOnCreate } =
    useAssetContext()

  const [assetClass, setAssetClass] = useState('RENDA_FIXA')
  const isOpenSheet: boolean = searchParams?.get('createAsset') ? true : false

  const { mutateAsync: createAsset, isLoading: isLoadingCreateAsset } =
    useCreateAsset({
      onSuccess: async () => {
        if (tabSelected === (assetClass as ClassEnum)) {
          await handleRefetchAssetsOnCreate(assetClass as ClassEnum)
        }
        handleCloseSheet()
      }
    })

  const handleOpenSheet = useCallback(
    () =>
      router.push(`${pathname}?${searchParams?.toString()}&createAsset=true`),
    [pathname, router, searchParams]
  )

  const handleCloseSheet = useCallback(
    () =>
      router.push(
        `${pathname}?tabSelected=${searchParams?.get('tabSelected')}`
      ),
    [pathname, router, searchParams]
  )

  const onSubmit = useCallback(
    async (data: CreateAssetFormData) => {
      try {
        if (assetClass === ClassEnum.RENDA_FIXA) {
          const newAsset: AssetProps = {
            name: data.name,
            class: assetClass as ClassEnum,
            value: data.amount,
            goal: data.goal
          }

          await createAsset(newAsset)
          return
        }

        if (assetClass === ClassEnum.CRYPTO) {
          const cryptoData = await queryClient.fetchQuery({
            queryKey: ['fetchCryptos'],
            queryFn: () => fetchCryptos([data.name.toUpperCase()])
          })

          if (!cryptoData) throw new Error()

          const newCryptoAsset: AssetProps = {
            name: data.name,
            class: assetClass as ClassEnum,
            amount: data.amount,
            value: cryptoData.coins[0].value * data.amount,
            goal: data.goal
          }

          await createAsset(newCryptoAsset)
          return
        }

        const stockData = await queryClient.fetchQuery({
          queryKey: ['fetchStocks'],
          queryFn: () => fetchStocks([data.name.toUpperCase()])
        })

        if (!stockData) throw new Error()

        const newAsset: AssetProps = {
          name: data.name,
          class: assetClass as ClassEnum,
          amount: data.amount,
          value: stockData.result[0].value * data.amount,
          goal: data.goal
        }

        await createAsset(newAsset)
        return
      } catch (error) {
        toast({
          title: 'Algo deu errado.',
          description: `Não encontramos o ativo ${data.name.toUpperCase()}.`,
          variant: 'destructive'
        })
      }
    },
    [assetClass, queryClient, createAsset]
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
    handleOpenSheet,
    handleCloseSheet
  }
}
