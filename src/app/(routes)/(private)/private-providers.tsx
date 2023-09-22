'use client'

import { UserSession } from '@/app/(services)/user/types'
import { AppProvider } from '@/contexts/useAppContext'
import { AssetProvider } from '@/contexts/useAssetContext'

interface Props {
  user: UserSession
  children: React.ReactNode
}

const PrivateProviders = ({ user, children }: Props) => {
  return (
    <AppProvider user={user}>
      <AssetProvider>{children}</AssetProvider>
    </AppProvider>
  )
}

export { PrivateProviders }
