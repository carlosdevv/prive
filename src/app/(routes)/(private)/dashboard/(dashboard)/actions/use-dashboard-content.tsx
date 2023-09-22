import { UserSession } from '@/app/(services)/user/types'
import { GoalsProps, useAppContext } from '@/contexts/useAppContext'
import { useEffect } from 'react'

type CustomHookDashboardContentComponent = {
  user: UserSession
  goals: GoalsProps
}

export const useDashboardContentComponent = ({
  user,
  goals
}: CustomHookDashboardContentComponent) => {
  const {
    handleSetUserProps,
    goalsValue,
    setGoalsValue,
    goalsSum,
    handleGetGoalsSum
  } = useAppContext()

  useEffect(() => {
    handleSetUserProps(user)
    setGoalsValue(goals)
    handleGetGoalsSum(goals)
  }, [goals])

  return { goalsValue, goalsSum }
}
