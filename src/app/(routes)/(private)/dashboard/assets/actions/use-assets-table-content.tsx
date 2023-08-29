import { AssetDTO } from '@/app/(services)/asset/types'
import { useAppContext } from '@/contexts/useAppContext'
import { useAssetContext } from '@/contexts/useAssetContext'
import { ClassEnum } from '@prisma/client'
import { useEffect, useMemo } from 'react'

type AssetsTableContentComponentProps = {
  assets?: AssetDTO[]
  classType: ClassEnum
}
export const useAssetsTableContentComponent = ({
  assets,
  classType
}: AssetsTableContentComponentProps) => {
  const { handleSetClassValue } = useAppContext()
  const { assetsList } = useAssetContext()

  const handleSumAssets = useMemo(() => {
    if (!assets) return
    const sum = assets.reduce((acc, item) => {
      return acc + (item.price ?? 0) * (item.amount ?? 0)
    }, 0)
    return sum
  }, [assets])

  useEffect(() => {
    if (handleSumAssets !== undefined) {
      handleSetClassValue(handleSumAssets, classType)
    }
  }, [handleSumAssets, assetsList])

  return {}
}
