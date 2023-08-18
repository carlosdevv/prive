import { useAssetContext } from '@/contexts/useAssetContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const assetInfoManagerSchema = z.object({
  investmentValue: z.coerce
    .number({ invalid_type_error: 'Apenas números são permitidos.' })
    .nonnegative('Insira um valor positivo.'),
  investmentClassAmount: z.coerce
    .number({ invalid_type_error: 'Apenas números são permitidos.' })
    .nonnegative('Insira um valor positivo.'),
  investmentAssetsAmount: z.coerce
    .number({ invalid_type_error: 'Apenas números são permitidos.' })
    .nonnegative('Insira um valor positivo.')
})

type AssetInfoManagerFormData = z.infer<typeof assetInfoManagerSchema>

export const useAssetInfoManagerComponent = () => {
  const { assetInfoManagerProps } = useAssetContext()

  const onSubmit = useCallback(() => {}, [])

  const { register, watch, handleSubmit } = useForm<AssetInfoManagerFormData>({
    resolver: zodResolver(assetInfoManagerSchema),
    defaultValues: {
      investmentValue: assetInfoManagerProps.investmentValue,
      investmentClassAmount: assetInfoManagerProps.investmentClassAmount,
      investmentAssetsAmount: assetInfoManagerProps.investmentAssetsAmount
    }
  })

  return { assetInfoManagerProps, register, watch, handleSubmit, onSubmit }
}
