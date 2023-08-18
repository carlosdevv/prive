'use client'

import {
  GetGoals,
  UpdateGoal
} from '@/app/(routes)/(private)/dashboard/(dashboard)/actions/goals'
import { GetPatrimony } from '@/app/(routes)/(private)/dashboard/(dashboard)/actions/patrimony'
import { UserSession } from '@/app/(services)/user/types'
import { ClassEnum } from '@prisma/client'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

export type GoalsProps = {
  id: string
  class: ClassEnum
  value: number | null
  goal: number | null
  userId: string
}[]

type AppContextType = {
  patrimonyValue: number
  setPatrimonyValue: Dispatch<SetStateAction<number>>
  userProps: UserSession | undefined
  setUserProps: Dispatch<SetStateAction<UserSession | undefined>>
  handleUpdateUserGoal: (newGoal: number, classType: ClassEnum) => Promise<void>
  goalsValue: GoalsProps
  setGoalsValue: Dispatch<SetStateAction<GoalsProps>>
  handleGetUserGoals: () => Promise<void>
}

type AppProviderProps = {
  children: ReactNode
}

export const AppContext = createContext<AppContextType>({} as AppContextType)

export const AppProvider = ({ children }: AppProviderProps) => {
  const [userProps, setUserProps] = useState<UserSession | undefined>()
  const [patrimonyValue, setPatrimonyValue] = useState<number>(0)
  const [goalsValue, setGoalsValue] = useState<GoalsProps>({} as GoalsProps)

  const handleGetPatrimonyValue = useCallback(async () => {
    if (!userProps) return
    const patrimony = await GetPatrimony(userProps)

    if (patrimony) {
      setPatrimonyValue(patrimony)
    }
  }, [userProps])

  const handleGetUserGoals = useCallback(async () => {
    if (!userProps) return
    const goals = await GetGoals(userProps)

    if (goals) {
      setGoalsValue(goals)
    }
  }, [userProps])

  const handleUpdateUserGoal = useCallback(
    async (newGoal: number, classType: ClassEnum) => {
      if (!userProps) return

      await UpdateGoal(userProps, newGoal, classType)
      await handleGetUserGoals()
    },
    []
  )

  useEffect(() => {
    handleGetPatrimonyValue()
  }, [handleGetPatrimonyValue])

  return (
    <AppContext.Provider
      value={{
        patrimonyValue,
        setPatrimonyValue,
        userProps,
        setUserProps,
        handleUpdateUserGoal,
        goalsValue,
        setGoalsValue,
        handleGetUserGoals
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)

  return context
}
