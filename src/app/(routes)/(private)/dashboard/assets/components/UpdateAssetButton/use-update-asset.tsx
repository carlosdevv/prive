import { useDeleteAsset, useUpdateAsset } from '@/app/(services)/asset/useAsset'
import { useAssetContext } from '@/contexts/useAssetContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
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
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const isOpenRemoveAssetDialog: boolean = searchParams?.get('deleteAsset')
    ? true
    : false
  const isOpenSheet: boolean = searchParams?.get('updateAsset') ? true : false

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

  const { tabSelected, handleGetAssets } = useAssetContext()

  const { mutateAsync: updateAsset, isLoading: isUpdatingAsset } =
    useUpdateAsset({
      onSuccess: async () => {
        await handleGetAssets(tabSelected)
        handleCloseSheet()
      }
    })

  const { mutateAsync: deleteAsset, isLoading: isDeletingAsset } =
    useDeleteAsset({
      onSuccess: async () => {
        await handleGetAssets(tabSelected)
        handleCloseDeleteSheet()
        handleCloseSheet()
      }
    })

  const handleOpenSheet = useCallback(() => {
    router.push(
      `${pathname}?${searchParams?.toString()}&updateAsset=true&asset=${assetName}&value=${assetValue}&goal=${assetGoal}`
    )
  }, [assetGoal, assetName, assetValue, pathname, router, searchParams])

  const handleOpenDeleteSheet = useCallback(() => {
    if (isOpenRemoveAssetDialog) return
    router.push(`${pathname}?${searchParams?.toString()}&deleteAsset=true`)
  }, [isOpenRemoveAssetDialog, pathname, router, searchParams])

  const handleCloseSheet = useCallback(
    () =>
      router.push(
        `${pathname}?tabSelected=${searchParams?.get('tabSelected')}`
      ),
    [pathname, router, searchParams]
  )

  const handleCloseDeleteSheet = useCallback(() => router.back(), [router])

  const handleRemoveAsset = useCallback(async () => {
    await deleteAsset({ name: assetName })
  }, [assetName, deleteAsset])

  const onUpdateAsset = useCallback(
    async (data: UpdateAssetFormData) => {
      const params = {
        ...data,
        name: assetName
      }
      await updateAsset(params)
    },
    [assetName, updateAsset]
  )

  return {
    isOpenRemoveAssetDialog,
    handleCloseDeleteSheet,
    isOpenSheet,
    handleCloseSheet,
    reset,
    handleSubmit,
    onUpdateAsset,
    register,
    errors,
    isUpdatingAsset,
    isDeletingAsset,
    handleRemoveAsset,
    handleOpenSheet,
    handleOpenDeleteSheet
  }
}
