import { useDeleteAsset, useUpdateAsset } from '@/app/(services)/asset/useAsset'
import { useAppContext } from '@/contexts/useAppContext'
import { useAssetContext } from '@/contexts/useAssetContext'
import { toast } from '@/hooks/useToast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState } from 'react'
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
    .number()
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

  const { userProps: user } = useAppContext()
  const { refetchAssets } = useAssetContext()
  const [isOpenAlertDialog, setIsOpenAlertDialog] = useState(false)
  const [isOpenSheet, setIsOpenSheet] = useState(false)

  const { mutate: updateAsset, isLoading: isUpdatingAsset } = useUpdateAsset({
    onSuccess: async () => {
      await refetchAssets()
      setIsOpenSheet(false)
      toast({
        title: 'Sucesso.',
        description: 'Ativo atualizado com sucesso.'
      })
    },
    onError: error => {
      toast({
        title: 'Erro.',
        description: error.message,
        variant: 'destructive'
      })
    }
  })

  const { mutate: deleteAsset, isLoading: isDeletingAsset } = useDeleteAsset({
    onSuccess: async () => {
      await refetchAssets()
      setIsOpenSheet(false)
      toast({
        title: 'Sucesso.',
        description: 'Ativo removido com sucesso.'
      })
    },
    onError: error => {
      toast({
        title: 'Erro.',
        description: error.message,
        variant: 'destructive'
      })
    }
  })

  const handleRemoveAsset = useCallback(() => {
    deleteAsset({ name: assetName, userId: user!.id })
    setIsOpenAlertDialog(false)
  }, [])

  function onSubmit(data: UpdateAssetFormData) {
    const params = {
      ...data,
      name: assetName,
      userId: user!.id
    }
    updateAsset(params)
  }

  return {
    isOpenAlertDialog,
    setIsOpenAlertDialog,
    isOpenSheet,
    setIsOpenSheet,
    reset,
    handleSubmit,
    onSubmit,
    register,
    errors,
    isUpdatingAsset,
    isDeletingAsset,
    handleRemoveAsset
  }
}
