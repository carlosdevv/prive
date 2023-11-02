import { fetchCryptos, fetchQuote, getAssets } from '@/app/(services)/asset'
import { AssetProps } from '@/app/(services)/asset/types'
import {
  useCreateAsset,
  useFetchUSDCotation
} from '@/app/(services)/asset/useAsset'
import useQueryParams from '@/hooks/useQueryParams'
import { toast } from '@/hooks/useToast'
import { useAppStore } from '@/store/app'
import { useAssetsStore } from '@/store/assets'
import { zodResolver } from '@hookform/resolvers/zod'
import { ClassEnum } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useAssetsTableContentComponent } from '../AssetsTableContent/use-assets-table-content'

const createAssetSchema = z.object({
  name: z
    .string({ required_error: 'Campo obrigatório.' })
    .nonempty('Campo obrigatório.'),
  amount: z
    .string({
      required_error: 'Campo obrigatório.',
      invalid_type_error: 'Informe um valor.'
    })
    .max(16, 'Insira um valor de até 10 milhões.')
    .transform(val => Number(val.replace(/[^\d,]/g, '').replace(/,/, '.'))),
  goal: z.coerce
    .number({ invalid_type_error: 'Apenas números são permitidos.' })
    .nonnegative('A meta deve ser positiva.')
    .min(1, 'É necessário informar o objetivo')
    .max(100, 'O objetivo deve ter no máximo 100%.')
})

type CreateAssetFormData = z.infer<typeof createAssetSchema>

export const useCreateAssetComponent = () => {
  const form = useForm<CreateAssetFormData>({
    resolver: zodResolver(createAssetSchema),
    defaultValues: {
      name: '',
      amount: 0,
      goal: 0
    }
  })
  const queryClient = useQueryClient()

  const {
    tabSelected,
    actions: { setIsLoadingValidateAssets, setAssets, setFormattedAssets }
  } = useAssetsStore()

  const {
    dolarValue,
    actions: { setDolarValue }
  } = useAppStore()

  const { handleFormatAssets, handleSumAssetsAndUpdateClass } =
    useAssetsTableContentComponent({
      classType: tabSelected
    })

  const { setQueryParams } = useQueryParams<{
    createAsset?: boolean
  }>()

  const [assetClass, setAssetClass] = useState('RENDA_FIXA')
  const [currencyMode, setIsCurrencyMode] = useState<'BRL' | 'USD'>('BRL')
  const [isOpenSheet, setIsOpenSheet] = useState<boolean>(false)
  const [isSearchingAsset, setIsSearchingAsset] = useState<boolean>(false)

  const { mutateAsync: createAsset, isLoading: isLoadingCreateAsset } =
    useCreateAsset({
      onSuccess: async () => {
        await handleRefetchAssetsOnCreate(assetClass as ClassEnum)
      }
    })

  const { data: USDCotation, isLoading: isLoadingUSDCotation } =
    useFetchUSDCotation({
      enabled: !dolarValue
    })

  const handleChangeCurrencyMode = useCallback(
    () => setIsCurrencyMode(prev => (prev === 'BRL' ? 'USD' : 'BRL')),
    []
  )

  const handleOpenSheet = useCallback(() => {
    setIsOpenSheet(true)
  }, [])

  const handleCloseSheet = useCallback(() => {
    setIsOpenSheet(false)
    form.reset()
  }, [form])

  const handleRefetchAssetsOnCreate = useCallback(
    async (className: ClassEnum) => {
      if (tabSelected !== className) {
        handleCloseSheet()
        return
      }

      setIsLoadingValidateAssets(true)
      const assets = await queryClient.fetchQuery({
        queryKey: ['getAssets'],
        queryFn: () => getAssets({ class: className })
      })

      setAssets(assets)
      setFormattedAssets(handleFormatAssets(assets))
      await handleSumAssetsAndUpdateClass(assets, ClassEnum.RENDA_FIXA)
      setIsLoadingValidateAssets(false)
      handleCloseSheet()
    },
    [
      handleCloseSheet,
      handleFormatAssets,
      handleSumAssetsAndUpdateClass,
      queryClient,
      setAssets,
      setFormattedAssets,
      setIsLoadingValidateAssets,
      tabSelected
    ]
  )

  const onSubmit = useCallback(
    async (data: CreateAssetFormData) => {
      const isBRL = currencyMode === 'BRL'
      if (USDCotation) setDolarValue(Number(USDCotation))

      try {
        if (assetClass === ClassEnum.RENDA_FIXA) {
          const newAsset: AssetProps = {
            name: data.name,
            class: assetClass as ClassEnum,
            value: !isBRL
              ? (dolarValue ?? Number(USDCotation) ?? 1) * data.amount
              : data.amount,
            goal: data.goal
          }

          await createAsset(newAsset)
          return
        }

        if (assetClass === ClassEnum.CRYPTO) {
          setIsSearchingAsset(true)
          const cryptoData = await queryClient.fetchQuery({
            queryKey: ['fetchCryptos'],
            queryFn: () => fetchCryptos([data.name.toUpperCase()])
          })
          setIsSearchingAsset(false)
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
        setIsSearchingAsset(true)
        const stockData = await queryClient.fetchQuery({
          queryKey: ['fetchQuote'],
          queryFn: () => fetchQuote([data.name.toUpperCase()])
        })
        setIsSearchingAsset(false)
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
        setIsSearchingAsset(false)
        toast({
          title: 'Algo deu errado.',
          description: `Não encontramos o ativo ${data.name.toUpperCase()}.`,
          variant: 'destructive'
        })
      }
    },
    [
      currencyMode,
      USDCotation,
      setDolarValue,
      assetClass,
      queryClient,
      createAsset,
      dolarValue
    ]
  )

  useEffect(() => {
    if (isOpenSheet) {
      setQueryParams({ createAsset: true })
    } else {
      setQueryParams({ createAsset: undefined })
    }
  }, [isOpenSheet, setQueryParams])

  return {
    isOpenSheet,
    onSubmit,
    assetClass,
    setAssetClass,
    isLoadingCreateAsset,
    handleOpenSheet,
    handleCloseSheet,
    form,
    currencyMode,
    handleChangeCurrencyMode,
    isLoadingUSDCotation,
    isSearchingAsset
  }
}
