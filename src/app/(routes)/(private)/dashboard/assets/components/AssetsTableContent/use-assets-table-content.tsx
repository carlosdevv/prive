import { AssetDTO } from '@/app/(services)/asset/types'
import { useAssetContext } from '@/contexts/useAssetContext'
import { ClassEnum } from '@prisma/client'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

type AssetsTableContentComponentProps = {
  classType: ClassEnum
}
export const useAssetsTableContentComponent = ({
  classType
}: AssetsTableContentComponentProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const { assetsList, handleGetAssets, isLoadingAssets, handleSetTabSelected } =
    useAssetContext()

  const [formattedAssets, setFormattedAssets] = useState<AssetDTO[]>([])

  const handleFormatAssets = useCallback(() => {
    const isRendaFixa =
      assetsList &&
      assetsList.some(asset => asset.class === ClassEnum.RENDA_FIXA)

    const isCryptoAsset =
      assetsList && assetsList.some(asset => asset.class === ClassEnum.CRYPTO)

    const assets: AssetDTO[] = assetsList.map(asset => {
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

    setFormattedAssets(assets.reverse())
  }, [assetsList])

  useEffect(() => {
    if (assetsList.length > 0) {
      handleFormatAssets()
    } else {
      setFormattedAssets([])
    }
  }, [assetsList, handleFormatAssets])

  useEffect(() => {
    router.replace(`${pathname}?tabSelected=${classType}`)
    handleSetTabSelected(classType)
    handleGetAssets(classType)
  }, [classType, handleSetTabSelected, handleGetAssets, router, pathname])

  return {
    formattedAssets,
    isLoadingAssets
  }
}
