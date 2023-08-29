import { useFetchUSDCotation } from '@/app/(services)/asset/useAsset'
import { useAppContext } from '@/contexts/useAppContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { ClassEnum } from '@prisma/client'
import { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type ResumeInvestmentComponentProps = {
  classType: ClassEnum
  meta?: number | null
  value?: number | null
}

const updateGoalSchema = z.object({
  goal: z.coerce
    .number({ invalid_type_error: 'A meta deve ser um valor numérico.' })
    .nonnegative('A meta deve ser um valor positivo.')
    .min(0, 'É necessário informar um valor para atualizar.')
    .max(100, 'O valor da meta deve ser no máximo 100%.')
})

type UpdateGoalFormData = z.infer<typeof updateGoalSchema>

export const useResumeInvestmentComponent = ({
  classType,
  meta,
  value
}: ResumeInvestmentComponentProps) => {
  const { handleUpdateUserGoal: updateUserGoal, patrimonyValue } =
    useAppContext()

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<UpdateGoalFormData>({
    resolver: zodResolver(updateGoalSchema),
    defaultValues: {
      goal: meta ?? 0
    }
  })

  const [isEditingMode, setIsEditingMode] = useState<boolean>(false)
  const [isEditingLoading, setIsEditingLoading] = useState<boolean>(false)

  const handleSetIsEditingMode = useCallback(() => {
    setIsEditingMode(prevState => !prevState)
  }, [])

  const handleUpdateUserGoal = useCallback(async () => {
    const newGoal = Number(getValues('goal'))
    if (newGoal === meta) {
      setIsEditingMode(false)
      return
    }
    setIsEditingLoading(true)
    setIsEditingMode(false)
    await updateUserGoal(newGoal, classType)
    setIsEditingLoading(false)
  }, [])

  const handleGetCurrentGoal = useMemo(() => {
    if (!value) return

    const currentGoal = (value * 100) / patrimonyValue
    return currentGoal
  }, [value, patrimonyValue])

  const { data: dollarCotation, isLoading } = useFetchUSDCotation()

  return {
    handleUpdateUserGoal,
    isEditingMode,
    handleSetIsEditingMode,
    isLoading,
    dollarCotation,
    register,
    handleSubmit,
    errors,
    isEditingLoading,
    handleGetCurrentGoal
  }
}
