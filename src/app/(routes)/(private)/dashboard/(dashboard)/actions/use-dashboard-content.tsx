import { UserSession } from '@/app/(services)/user/types'
import { GoalsProps, useAppContext } from '@/contexts/useAppContext'
import { useAppStore } from '@/store/app'
import { useEffect } from 'react'

type CustomHookDashboardContentComponent = {
  user: UserSession
  goals: GoalsProps
}

export const useDashboardContentComponent = ({
  user,
  goals
}: CustomHookDashboardContentComponent) => {
  const { goalsValue, setGoalsValue, goalsSum, handleGetGoalsSum } =
    useAppContext()

  const {
    actions: { setUserProps }
  } = useAppStore()

  useEffect(() => {
    setUserProps(user)
    setGoalsValue(goals)
    handleGetGoalsSum(goals)
  }, [goals])

  return { goalsValue, goalsSum }
}
