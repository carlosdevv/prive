import { useAssetContext } from '@/contexts/useAssetContext'

export const useAssetsContentComponent = () => {
  const { refetchAssets } = useAssetContext()

  return { refetchAssets }
}
