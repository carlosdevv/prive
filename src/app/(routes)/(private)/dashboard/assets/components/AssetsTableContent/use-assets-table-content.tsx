import { fetchCryptos, fetchQuote, getAssets } from '@/app/(services)/asset'
import { UpdateAssetValue } from '@/app/(services)/asset/repository/update-asset-value'
import { AssetDTO } from '@/app/(services)/asset/types'
import { useGetAssets } from '@/app/(services)/asset/useAsset'
import { UpdateClassValue } from '@/app/(services)/class/repository/update-class-value'
import useQueryParams from '@/hooks/useQueryParams'
import { useAppStore } from '@/store/app'
import { useAssetsStore } from '@/store/assets'
import { Asset, ClassEnum } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect } from 'react'

type AssetsTableContentComponentProps = {
  classType?: ClassEnum
}
export const useAssetsTableContentComponent = ({
  classType
}: AssetsTableContentComponentProps) => {
  const queryClient = useQueryClient()

  const { setQueryParams } = useQueryParams<{
    tabSelected?: string
  }>()

  const { userProps } = useAppStore()

  const {
    formattedAssets,
    actions: { setAssets, setFormattedAssets, setIsLoadingValidateAssets }
  } = useAssetsStore()

  const { data: assetsList, isLoading: isLoadingAssets } = useGetAssets(
    { class: classType },
    {
      enabled: !!classType
    }
  )

  const handleUpdateAssetPrice = useCallback(
    async (ticker: string, newValue: number, className?: ClassEnum) => {
      if (!className) return

      await UpdateAssetValue(ticker, newValue)

      const updatedAssetsWithNewValue = await queryClient.fetchQuery({
        queryKey: ['getAssets'],
        queryFn: () => getAssets({ class: className })
      })

      if (!updatedAssetsWithNewValue) return

      setAssets(updatedAssetsWithNewValue)
    },
    [queryClient, setAssets]
  )

  const handleSumAssetsAndUpdateClass = useCallback(
    async (assets: Asset[], classType?: ClassEnum) => {
      if (!userProps || !classType) return

      const assetsSum = assets.reduce((acc, curr) => {
        return acc + (curr.value ?? 0)
      }, 0)

      await UpdateClassValue(userProps.id, classType, assetsSum)
    },
    [userProps]
  )

  const handleFormatAssets = useCallback((assets: Asset[]) => {
    const isRendaFixa =
      assets && assets.some(asset => asset.class === ClassEnum.RENDA_FIXA)

    const isCryptoAsset =
      assets && assets.some(asset => asset.class === ClassEnum.CRYPTO)

    const formatted: AssetDTO[] = assets.map(asset => {
      if (isRendaFixa) {
        return {
          id: asset.id,
          name: asset.name,
          value: asset.value,
          goal: asset.goal,
          currentGoal: 0,
          dif: 0,
          aporte: 0,
          isBuy: false
        }
      }

      if (isCryptoAsset) {
        return {
          id: asset.id,
          name: asset.name.toUpperCase(),
          amount: asset.amount,
          goal: asset.goal,
          price: asset.value ? asset.value / (asset.amount ?? 1) : 0,
          currentGoal: 0,
          dif: 0,
          aporte: 0,
          isBuy: false
        }
      }

      return {
        id: asset.id,
        name: asset.name.toUpperCase(),
        amount: asset.amount,
        goal: asset.goal,
        price: asset.value ? asset.value / (asset.amount ?? 1) : 0,
        currentGoal: 0,
        dif: 0,
        aporte: 0,
        isBuy: false
      }
    })
    return formatted.reverse()
  }, [])

  const handleValidateAssets = useCallback(async () => {
    setIsLoadingValidateAssets(true)
    if (!assetsList || assetsList.length < 1) {
      setFormattedAssets([])
      setAssets([])
      await handleSumAssetsAndUpdateClass([], classType)
      setIsLoadingValidateAssets(false)
      return
    }

    const isRendaFixa = assetsList.some(
      asset => asset.class === ClassEnum.RENDA_FIXA
    )

    const isCrypto = assetsList.some(asset => asset.class === ClassEnum.CRYPTO)

    if (isRendaFixa) {
      setAssets(assetsList)
      setFormattedAssets(handleFormatAssets(assetsList))
      await handleSumAssetsAndUpdateClass(assetsList, ClassEnum.RENDA_FIXA)
      setIsLoadingValidateAssets(false)
      return
    }

    if (isCrypto) {
      const cryptoData = await queryClient.fetchQuery({
        queryKey: ['fetchCryptos', assetsList],
        queryFn: () => fetchCryptos(assetsList.map(asset => asset.name)),
        staleTime: 1000 * 60 * 60 // 1 hour
      })

      if (!cryptoData) {
        setIsLoadingValidateAssets(false)
        return
      }

      cryptoData.coins.map(async item => {
        const asset = assetsList.find(asset => asset.name === item.coin)

        if (asset && asset.value !== item.value) {
          await handleUpdateAssetPrice(item.coin, item.value, ClassEnum.CRYPTO)
        }
      })

      await handleSumAssetsAndUpdateClass(assetsList, ClassEnum.CRYPTO)
      setFormattedAssets(handleFormatAssets(assetsList))
      setIsLoadingValidateAssets(false)
      return
    } else {
      const stockData = await queryClient.fetchQuery({
        queryKey: ['fetchQuote', assetsList],
        queryFn: () => fetchQuote(assetsList.map(asset => asset.name)),
        staleTime: 1000 * 60 * 60 // 1 hour
      })

      if (!stockData) {
        setIsLoadingValidateAssets(false)
        return
      }

      stockData.result.map(async item => {
        const asset = assetsList.find(asset => asset.name === item.ticker)

        if (asset && asset.value !== item.value) {
          await handleUpdateAssetPrice(item.ticker, item.value, classType)
        }
      })

      await handleSumAssetsAndUpdateClass(assetsList, classType)
      setFormattedAssets(handleFormatAssets(assetsList))
      setIsLoadingValidateAssets(false)
      return
    }
  }, [
    assetsList,
    classType,
    handleFormatAssets,
    handleSumAssetsAndUpdateClass,
    handleUpdateAssetPrice,
    queryClient,
    setAssets,
    setFormattedAssets,
    setIsLoadingValidateAssets
  ])

  useEffect(() => {
    setQueryParams({ tabSelected: classType })
  }, [classType, setQueryParams])

  useEffect(() => {
    handleValidateAssets()
  }, [handleValidateAssets])

  return {
    isLoadingAssets,
    handleFormatAssets,
    assetsList,
    formattedAssets,
    handleSumAssetsAndUpdateClass,
    handleValidateAssets
  }
}
