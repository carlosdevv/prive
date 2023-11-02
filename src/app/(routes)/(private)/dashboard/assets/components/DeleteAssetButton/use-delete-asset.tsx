import { useDeleteAsset } from '@/app/(services)/asset/useAsset'
import { useAssetContext } from '@/contexts/useAssetContext'
import { toast } from '@/hooks/useToast'
import { useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'

export const useDeleteAssetComponent = () => {
  const { tabSelected, handleGetAssets, assetPropsToUpdate } = useAssetContext()
  const searchParams = useSearchParams()

  const [isOpenDeleteAssetDialog, setIsOpenDeleteAssetDialog] =
    useState<boolean>(false)

  const { mutateAsync: deleteAsset, isLoading: isDeletingAsset } =
    useDeleteAsset({
      onSuccess: async () => {
        await handleGetAssets(tabSelected)
        setIsOpenDeleteAssetDialog(false)
      }
    })

  const handleOpenDeleteSheet = useCallback(() => {
    setIsOpenDeleteAssetDialog(true)
    console.log(assetPropsToUpdate)
  }, [])

  const handleCloseDeleteSheet = useCallback(
    () => setIsOpenDeleteAssetDialog(false),
    []
  )

  const handleRemoveAsset = useCallback(async () => {
    const assetName = searchParams?.get('name')
    if (!assetPropsToUpdate || assetName !== assetPropsToUpdate.name) {
      toast({
        title: 'Erro.',
        description: 'Não foi possível remover o ativo, tente novamente.'
      })
      return
    }

    await deleteAsset({ name: assetPropsToUpdate.name })
  }, [assetPropsToUpdate, deleteAsset, searchParams])

  return {
    handleOpenDeleteSheet,
    handleCloseDeleteSheet,
    handleRemoveAsset,
    isDeletingAsset,
    isOpenDeleteAssetDialog
  }
}
