import { useUpdateAsset } from '@/app/(services)/asset/useAsset'
import { useAssetContext } from '@/contexts/useAssetContext'
import { toast } from '@/hooks/useToast'
import { useAssetsStore } from '@/store/assets'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const updateAssetSchema = z.object({
  value: z
    .number({ invalid_type_error: 'Apenas números são permitidos.' })
    .nonnegative('Insira um valor positivo.'),
  goal: z
    .number({ invalid_type_error: 'Apenas números são permitidos.' })
    .nonnegative('A meta deve ser positiva.')
    .min(1, 'É necessário informar o objetivo')
    .max(100, 'O objetivo deve ter no máximo 100%.')
})

type UpdateAssetFormData = z.infer<typeof updateAssetSchema>

export const useUpdateAssetPageContentComponent = () => {
  const { handleGetAssets } = useAssetContext()
  const { tabSelected, assetPropsToUpdate } = useAssetsStore()
  const searchParams = useSearchParams()
  const route = useRouter()

  const form = useForm<UpdateAssetFormData>({
    resolver: zodResolver(updateAssetSchema),
    defaultValues: {
      value: assetPropsToUpdate?.value || 0,
      goal: assetPropsToUpdate?.goal || 0
    }
  })

  const { mutateAsync: updateAsset, isLoading: isUpdatingAsset } =
    useUpdateAsset({
      onSuccess: async () => {
        await handleGetAssets(tabSelected)
        toast({
          title: 'Sucesso.',
          description: 'Ativo atualizado com sucesso.'
        })
      }
    })

  const handleCancelUpdateAsset = useCallback(() => {
    route.back()
  }, [route])

  const onUpdateAsset = useCallback(
    async (data: UpdateAssetFormData) => {
      if (!assetPropsToUpdate) return

      const params = {
        ...data,
        name: assetPropsToUpdate.name
      }
      await updateAsset(params)
      handleCancelUpdateAsset()
    },
    [assetPropsToUpdate, handleCancelUpdateAsset, updateAsset]
  )

  useEffect(() => {
    if (!searchParams) return
    const { get: searchParamsGet } = searchParams

    const updatePage = searchParamsGet('updateAsset') === 'true'

    if (!updatePage) {
      handleCancelUpdateAsset()
    }
  }, [assetPropsToUpdate, handleCancelUpdateAsset, searchParams])

  return {
    form,
    onUpdateAsset,
    isUpdatingAsset,
    handleCancelUpdateAsset,
    assetPropsToUpdate
  }
}
