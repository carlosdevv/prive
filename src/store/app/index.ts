import { UserSession } from '@/app/(services)/user/types'
import { create } from 'zustand'

type AppStoreActions = {
  setUserProps: (userProps: UserSession) => void
  setDolarValue: (dolarValue: number) => void
}

type AppStoreProps = {
  userProps?: UserSession
  dolarValue?: number
  actions: AppStoreActions
}

export const useAppStore = create<AppStoreProps>(set => ({
  userProps: undefined,
  dolarValue: undefined,
  actions: {
    setUserProps: userProps => set({ userProps }),
    setDolarValue: dolarValue => set({ dolarValue })
  }
}))
