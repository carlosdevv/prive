import { AssetProps } from '@/app/(services)/asset/types'
import {
  useCreateAsset,
  useFetchCryptos,
  useFetchStocks
} from '@/app/(services)/asset/useAsset'
import { useAppContext } from '@/contexts/useAppContext'
import { toast } from '@/hooks/useToast'
import { ROUTES } from '@/lib/routes'
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
    .number()
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
  const { userProps: user } = useAppContext()
  const [assetClass, setAssetClass] = useState('RENDA_FIXA')
  const [isErrorFetchAssetPrice, setIsErrorFetchAssetPrice] =
    useState<boolean>(false)
  const isOpenSheet: boolean = searchParams?.get('create-asset') ? true : false

  const { mutate: createAsset, isLoading: isLoadingCreateAsset } =
    useCreateAsset({
      onSuccess: () => {
        refetchAssets()
        handleCloseSheet()
        toast({
          title: 'Sucesso.',
          description: 'Ativo criado com sucesso.'
        })
      },
      onError: () => {
        toast({
          title: 'Algo deu errado.',
          description: 'Não foi possível criar o ativo.',
          variant: 'destructive'
        })
      }
    })

  const {
    mutateAsync: fetchStocks,
    isLoading: isLoadingFetchStocks,
    reset: resetFetchStocks
  } = useFetchStocks({
    onError() {
      setIsErrorFetchAssetPrice(true)
    }
  })

  const {
    mutateAsync: fetchCryptos,
    isLoading: isLoadingFetchCryptos,
    reset: resetFetchCryptos
  } = useFetchCryptos({
    onError() {
      setIsErrorFetchAssetPrice(true)
    }
  })

  const handleOpenSheet = useCallback(
    () => router.push(`${ROUTES.ASSETS}?create-asset=true`),
    []
  )

  const handleCloseSheet = useCallback(() => router.push(ROUTES.ASSETS), [])

  async function onSubmit(data: CreateAssetFormData) {
    const isRendaFixa = assetClass === 'RENDA_FIXA'
    const isStockClass = !isRendaFixa && assetClass !== ClassEnum.CRYPTO
    const isCryptoClass = assetClass === ClassEnum.CRYPTO

    try {
      if (isCryptoClass) {
        console.log('isCryptoClass')
        await fetchCryptos([data.name.toUpperCase()])
        if (isErrorFetchAssetPrice) {
          resetFetchCryptos()
          throw new Error()
        }
      }
      if (isStockClass) {
        console.log('isStockClass')
        await fetchStocks([data.name.toUpperCase()])
        if (isErrorFetchAssetPrice) {
          resetFetchStocks()
          throw new Error()
        }
      }

      const newAsset: AssetProps = {
        name: data.name,
        class: assetClass as ClassEnum,
        amount: isRendaFixa ? undefined : data.amount,
        value: isRendaFixa ? data.amount : undefined,
        goal: data.goal,
        userId: user?.id ?? ''
      }

      createAsset(newAsset)
    } catch (error) {
      toast({
        title: 'Algo deu errado.',
        description: `Não encontramos o ativo ${data.name.toUpperCase()}.`,
        variant: 'destructive'
      })
    }
  }
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
    setIsErrorFetchAssetPrice,
    isLoadingCreateAsset,
    isLoadingFetchStocks,
    isLoadingFetchCryptos,
    handleOpenSheet,
    handleCloseSheet
  }
}
