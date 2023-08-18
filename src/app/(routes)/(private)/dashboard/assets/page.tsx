import { LayoutPage } from '@/components/LayoutPage'
import { getCurrentUser } from '@/lib/session'
import { GetAssets } from './actions/assets'
import AssetsPageContent from './components/assets-content'

export default async function AssetsPage() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('User not found')
  }

  const assets = await GetAssets(user)

  return (
    <LayoutPage>
      <AssetsPageContent assets={assets} user={user} />
    </LayoutPage>
  )
}