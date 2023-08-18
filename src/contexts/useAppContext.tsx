'use client'

import { GetPatrimony } from '@/app/(routes)/(private)/dashboard/(dashboard)/actions/patrimony'
import { UserSession } from '@/app/(services)/user/types'
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

type AppContextType = {
  patrimonyValue: number
  setPatrimonyValue: Dispatch<SetStateAction<number>>
  userProps: UserSession | undefined
  setUserProps: Dispatch<SetStateAction<UserSession | undefined>>
}

type AppProviderProps = {
  children: ReactNode
}

export const AppContext = createContext<AppContextType>({} as AppContextType)

export const AppProvider = ({ children }: AppProviderProps) => {
  const [userProps, setUserProps] = useState<UserSession | undefined>()
  const [patrimonyValue, setPatrimonyValue] = useState<number>(0)

  const handleGetPatrimonyValue = useCallback(async () => {
    if (!userProps) return
    const patrimony = await GetPatrimony(userProps)

    if (patrimony) {
      setPatrimonyValue(patrimony)
    }
  }, [userProps])

  useEffect(() => {
    handleGetPatrimonyValue()
  }, [handleGetPatrimonyValue])

  return (
    <AppContext.Provider
      value={{
        patrimonyValue,
        setPatrimonyValue,
        userProps,
        setUserProps
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
