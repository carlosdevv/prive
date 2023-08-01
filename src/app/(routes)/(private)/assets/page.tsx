import { handleGetAssets } from '@/app/(services)/asset/repository/get-assets'
import { LayoutPage } from '@/components/LayoutPage'
import AssetsPageContent from './components/assets-page-content'
import { getCurrentUser } from '@/lib/session'

export default async function AssetsPage() {
  const user = await getCurrentUser()

  const assets = await handleGetAssets(user!)

  return (
    <LayoutPage>
      <AssetsPageContent assets={assets} user={user!} />
    </LayoutPage>
  )
}
