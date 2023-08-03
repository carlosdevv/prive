'use client'

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState
} from 'react'

export enum CurrencyOptions {
  BRL = 'BRL',
  USD = 'USD'
}
type AppContextType = {
  currencySelected: CurrencyOptions
  setCurrencySelected: Dispatch<SetStateAction<CurrencyOptions>>
}

type AppProviderProps = {
  children: ReactNode
}

export const AppContext = createContext<AppContextType>({} as AppContextType)

export const AppProvider = ({ children }: AppProviderProps) => {
  const [currencySelected, setCurrencySelected] = useState(CurrencyOptions.BRL)
  return (
    <AppContext.Provider
      value={{
        currencySelected,
        setCurrencySelected
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
