import { AssetDTO } from '@/app/(services)/asset/types'
import { useUpdateAsset } from '@/app/(services)/asset/useAsset'
import { useAssetContext } from '@/contexts/useAssetContext'
import { toast } from '@/hooks/useToast'
import { BASE_ROUTES, DASHBOARD_ROUTES } from '@/lib/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const updateAssetSchema = z.object({
  value: z.coerce
    .number({ invalid_type_error: 'Apenas números são permitidos.' })
    .nonnegative('Insira um valor positivo.'),
  goal: z.coerce
    .number({ invalid_type_error: 'Apenas números são permitidos.' })
    .nonnegative('A meta deve ser positiva.')
    .min(1, 'É necessário informar o objetivo')
    .max(100, 'O objetivo deve ter no máximo 100%.')
})

type UpdateAssetFormData = z.infer<typeof updateAssetSchema>

export const useUpdateAssetPageContentComponent = () => {
  const { tabSelected, handleGetAssets } = useAssetContext()
  const searchParams = useSearchParams()
  const route = useRouter()

  const [assetProps, setAssetProps] = useState<AssetDTO>()

  const form = useForm<UpdateAssetFormData>({
    resolver: zodResolver(updateAssetSchema)
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

  const onUpdateAsset = useCallback(
    async (data: UpdateAssetFormData) => {
      if (!assetProps) return

      const params = {
        ...data,
        name: assetProps.name
      }
      await updateAsset(params)
    },
    [assetProps, updateAsset]
  )

  const handleCancelUpdateAsset = useCallback(() => {
    route.back()
  }, [route])

  useEffect(() => {
    if (!searchParams) return
    const { get: searchParamsGet } = searchParams

    const updatePage = searchParamsGet('updateAsset') === 'true'
    const assetPropsParams: AssetDTO = {
      id: searchParamsGet('id') || '',
      name: searchParamsGet('name') || '',
      value: Number(searchParamsGet('value')) || 0,
      goal: Number(searchParamsGet('goal')) || 0,
      currentGoal: Number(searchParamsGet('currentGoal')) || 0,
      dif: Number(searchParamsGet('dif')) || 0,
      aporte: Number(searchParamsGet('aporte')) || 0,
      isBuy: searchParamsGet('isBuy') === 'true'
    }

    console.log('assetPropsParams', assetPropsParams)

    if (assetPropsParams) setAssetProps(() => assetPropsParams)

    if (!updatePage) {
      route.push(
        `${BASE_ROUTES.DASHBOARD}/${DASHBOARD_ROUTES.ASSETS}?tabSelected=RENDA_FIXA`
      )
    }
  }, [searchParams, setAssetProps, route])

  return {
    form,
    onUpdateAsset,
    isUpdatingAsset,
    handleCancelUpdateAsset,
    assetProps
  }
}
