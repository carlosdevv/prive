'use client'

import {
  GetUserClasses,
  UpdateClassGoal,
  UpdateClassValue
} from '@/app/(routes)/(private)/dashboard/(dashboard)/actions/classes'
import { GetPatrimony } from '@/app/(routes)/(private)/dashboard/(dashboard)/actions/patrimony'
import { UserSession } from '@/app/(services)/user/types'
import { toast } from '@/hooks/useToast'
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
  handleUpdateUserGoal: (newGoal: number, classType: ClassEnum) => Promise<void>
  goalsValue: GoalsProps
  setGoalsValue: Dispatch<SetStateAction<GoalsProps>>
  handleGetUserGoals: () => Promise<void>
  goalsSum: number
  handleGetGoalsSum: (value: GoalsProps) => void
  handleSetClassValue: (classSum: number, classType: ClassEnum) => Promise<void>
  handleSetUserProps: (user: UserSession) => void
}

type AppProviderProps = {
  user: UserSession
  children: ReactNode
}

export const AppContext = createContext<AppContextType>({} as AppContextType)

export const AppProvider = ({ user, children }: AppProviderProps) => {
  const [userProps, setUserProps] = useState<UserSession | undefined>(user)
  const [patrimonyValue, setPatrimonyValue] = useState<number>(0)
  const [goalsValue, setGoalsValue] = useState<GoalsProps>({} as GoalsProps)
  const [goalsSum, setGoalsSum] = useState<number>(0)

  const handleSetUserProps = useCallback((user: UserSession) => {
    setUserProps(user)
  }, [])

  const handleGetPatrimonyValue = useCallback(async () => {
    if (!userProps) return
    const patrimony = await GetPatrimony(userProps)

    if (patrimony) {
      setPatrimonyValue(patrimony)
    }
  }, [userProps])

  const handleUpdateUserGoal = useCallback(
    async (newGoal: number, classType: ClassEnum) => {
      if (!userProps) return

      try {
        await UpdateClassGoal(userProps, newGoal, classType)
        await handleGetUserGoals()
        toast({
          title: 'Sucesso.',
          description: 'A meta foi atualizada com sucesso.'
        })
      } catch (error) {
        toast({
          title: 'Erro.',
          description: 'Ocorreu um erro ao atualizar a meta, tente novamente.',
          variant: 'destructive'
        })
      }
    },
    [userProps]
  )

  const handleGetGoalsSum = useCallback((value: GoalsProps) => {
    const sum = value.reduce((acc, curr) => {
      if (curr.goal) {
        return acc + curr.goal
      }
      return acc
    }, 0)

    setGoalsSum(sum)
  }, [])

  const handleGetUserGoals = useCallback(async () => {
    if (!userProps) return
    const userClassGoals = await GetUserClasses(userProps)

    if (userClassGoals) {
      setGoalsValue(userClassGoals)
      handleGetGoalsSum(userClassGoals)
    }
  }, [handleGetGoalsSum, userProps])

  const handleSetClassValue = useCallback(
    async (classSum: number, classType: ClassEnum) => {
      if (!userProps) return

      await UpdateClassValue(userProps, classSum, classType)
    },
    [userProps]
  )

  useEffect(() => {
    handleGetPatrimonyValue()
    handleGetUserGoals()
  }, [handleGetPatrimonyValue, handleGetUserGoals])

  return (
    <AppContext.Provider
      value={{
        patrimonyValue,
        setPatrimonyValue,
        userProps,
        handleUpdateUserGoal,
        goalsValue,
        setGoalsValue,
        handleGetUserGoals,
        goalsSum,
        handleGetGoalsSum,
        handleSetClassValue,
        handleSetUserProps
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
