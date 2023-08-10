import { UserSession } from '@/app/(services)/user/types'
import { useAppContext } from '@/contexts/useAppContext'
import { useEffect } from 'react'

type CustomHookDashboardContentComponent = {
  user: UserSession
}

export const useDashboardContentComponent = ({
  user
}: CustomHookDashboardContentComponent) => {
  const { setUserProps } = useAppContext()

  useEffect(() => {
    setUserProps(user)
  }, [])

  return {}
}
