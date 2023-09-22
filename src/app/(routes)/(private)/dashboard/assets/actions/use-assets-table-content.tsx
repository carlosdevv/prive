import { AssetDTO } from '@/app/(services)/asset/types'
import { useAppContext } from '@/contexts/useAppContext'
import { useAssetContext } from '@/contexts/useAssetContext'
import { ClassEnum } from '@prisma/client'
import { useCallback, useEffect, useMemo, useState } from 'react'

type AssetsTableContentComponentProps = {
  classType: ClassEnum
}
export const useAssetsTableContentComponent = ({
  classType
}: AssetsTableContentComponentProps) => {
  const { handleSetClassValue } = useAppContext()
  const {
    refetchAssets,
    assetsList,
    isLoadingGetAssets,
    isLoadingRefetchAssets
  } = useAssetContext()

  const [formattedAssets, setFormattedAssets] = useState<AssetDTO[]>([])

  const handleSumAssets = useMemo(() => {
    if (!formattedAssets) return
    const sum = formattedAssets.reduce((acc, item) => {
      return acc + (item.price ?? 0) * (item.amount ?? 0)
    }, 0)
    return sum
  }, [formattedAssets])

  const handleFormatAssets = useCallback(async () => {
    const isRendaFixa =
      assetsList &&
      assetsList.some(asset => asset.class === ClassEnum.RENDA_FIXA)

    const isCryptoAsset =
      assetsList && assetsList.some(asset => asset.class === ClassEnum.CRYPTO)

    const assets: AssetDTO[] = assetsList.map(asset => {
      if (isRendaFixa) {
        return {
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
    setFormattedAssets(assets)
  }, [assetsList])

  useEffect(() => {
    if (handleSumAssets !== undefined) {
      handleSetClassValue(handleSumAssets, classType)
    }
  }, [handleSumAssets, handleSetClassValue, classType])

  useEffect(() => {
    refetchAssets(classType)
  }, [classType, refetchAssets])

  useEffect(() => {
    if (assetsList.length > 0) {
      handleFormatAssets()
      return
    }

    setFormattedAssets([])
  }, [assetsList, handleFormatAssets])

  return {
    assetsList,
    formattedAssets,
    isLoadingGetAssets,
    isLoadingRefetchAssets
  }
}
