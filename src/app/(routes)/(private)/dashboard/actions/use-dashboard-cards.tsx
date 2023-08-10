import { useFetchUSDCotation } from '@/app/(services)/asset/useAsset'
import { useAppContext } from '@/contexts/useAppContext'
import { ClassEnum } from '@prisma/client'

type CustomHookDashboardCardsComponent = {
  goals:
    | {
        id: string
        class: ClassEnum
        value: number | null
        userId: string
      }[]
}

export const useDashboardCardsComponent = ({
  goals
}: CustomHookDashboardCardsComponent) => {
  const { patrimonyValue } = useAppContext()
  const { data: dollarCotation, isLoading } = useFetchUSDCotation()

  const patrimonyInBr = goals.reduce((acc, goal) => {
    if (goal.class === ClassEnum.RENDA_FIXA) {
      acc + (goal.value || 0)
    }
    if (goal.class === ClassEnum.ACAO) {
      acc + (goal.value || 0)
    }
    if (goal.class === ClassEnum.FII) {
      acc + (goal.value || 0)
    }
    return acc
  }, 0)

  const patrimonyInUS = goals.reduce((acc, goal) => {
    if (goal.class === ClassEnum.STOCK) {
      acc + (goal.value || 0)
    }
    if (goal.class === ClassEnum.CRYPTO) {
      acc + (goal.value || 0)
    }
    if (goal.class === ClassEnum.REIT) {
      acc + (goal.value || 0)
    }
    return acc
  }, 0)

  return {
    patrimonyValue,
    isLoading,
    dollarCotation,
    patrimonyInBr,
    patrimonyInUS
  }
}
