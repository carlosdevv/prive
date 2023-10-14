import { useDeleteAsset } from '@/app/(services)/asset/useAsset'
import { useAssetContext } from '@/contexts/useAssetContext'
import { useCallback, useState } from 'react'

export const useDeleteAssetComponent = () => {
  const { tabSelected, handleGetAssets, assetPropsToUpdate } = useAssetContext()

  const [isOpenDeleteAssetDialog, setIsOpenDeleteAssetDialog] =
    useState<boolean>(false)

  const { mutateAsync: deleteAsset, isLoading: isDeletingAsset } =
    useDeleteAsset({
      onSuccess: async () => {
        await handleGetAssets(tabSelected)
        setIsOpenDeleteAssetDialog(false)
      }
    })

  const handleOpenDeleteSheet = useCallback(
    () => setIsOpenDeleteAssetDialog(true),
    []
  )

  const handleCloseDeleteSheet = useCallback(
    () => setIsOpenDeleteAssetDialog(false),
    []
  )

  const handleRemoveAsset = useCallback(async () => {
    if (!assetPropsToUpdate) return
    await deleteAsset({ name: assetPropsToUpdate.name })
  }, [assetPropsToUpdate, deleteAsset])

  return {
    handleOpenDeleteSheet,
    handleCloseDeleteSheet,
    handleRemoveAsset,
    isDeletingAsset,
    isOpenDeleteAssetDialog
  }
}
