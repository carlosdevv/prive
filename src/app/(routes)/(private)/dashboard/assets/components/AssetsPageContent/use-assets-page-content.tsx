import { useAssetsStore } from '@/store/assets'
import { ClassEnum } from '@prisma/client'
import { useCallback } from 'react'

export const useAssetsPageContent = () => {
  const {
    isLoadingValidateAssets,
    actions: { setTabSelected }
  } = useAssetsStore()

  const handleChangeTab = useCallback(
    (tab: ClassEnum) => {
      setTabSelected(tab)
    },
    [setTabSelected]
  )

  return { handleChangeTab, isLoadingValidateAssets }
}
