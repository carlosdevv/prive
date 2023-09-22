import { useDeleteAsset, useUpdateAsset } from '@/app/(services)/asset/useAsset'
import { useAssetContext } from '@/contexts/useAssetContext'
import { BASE_ROUTES, DASHBOARD_ROUTES } from '@/lib/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type CustomHookUpdateAssetComponent = {
  assetName: string
  assetValue: number
  assetGoal: number
}

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

export const useUpdateAssetComponent = ({
  assetName,
  assetGoal,
  assetValue
}: CustomHookUpdateAssetComponent) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<UpdateAssetFormData>({
    resolver: zodResolver(updateAssetSchema),
    defaultValues: {
      value: assetValue,
      goal: assetGoal
    }
  })

  const searchParams = useSearchParams()
  const router = useRouter()
  const { refetchAssets } = useAssetContext()
  const isOpenAlertDialog: boolean = searchParams?.get('delete-asset')
    ? true
    : false
  const isOpenSheet: boolean = searchParams?.get('update-asset') ? true : false
  const currentPath = `${BASE_ROUTES.DASHBOARD}${DASHBOARD_ROUTES.ASSETS}`

  const { mutate: updateAsset, isLoading: isUpdatingAsset } = useUpdateAsset({
    onSuccess: async () => {
      await refetchAssets()
      handleCloseSheet()
    }
  })

  const { mutate: deleteAsset, isLoading: isDeletingAsset } = useDeleteAsset({
    onSuccess: async () => {
      await refetchAssets()
      handleCloseSheet()
    }
  })

  const handleOpenSheet = useCallback(
    () => router.push(`${currentPath}?update-asset=true`),
    []
  )

  const handleOpenDeleteSheet = useCallback(() => {
    if (isOpenAlertDialog) return
    router.push(`${currentPath}?update-asset=true&delete-asset=true`)
  }, [])

  const handleCloseSheet = useCallback(() => router.replace(currentPath), [])

  const handleCloseDeleteSheet = useCallback(
    () => router.replace(`${currentPath}?update-asset=true`),
    []
  )

  const handleRemoveAsset = useCallback(() => {
    deleteAsset({ name: assetName })
    handleCloseDeleteSheet()
  }, [])

  function onSubmit(data: UpdateAssetFormData) {
    const params = {
      ...data,
      name: assetName
    }
    updateAsset(params)
  }

  return {
    isOpenAlertDialog,
    handleCloseDeleteSheet,
    isOpenSheet,
    handleCloseSheet,
    reset,
    handleSubmit,
    onSubmit,
    register,
    errors,
    isUpdatingAsset,
    isDeletingAsset,
    handleRemoveAsset,
    handleOpenSheet,
    handleOpenDeleteSheet
  }
}
