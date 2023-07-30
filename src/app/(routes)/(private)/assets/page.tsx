import { Header } from '@/components/Header'
import { LayoutPage } from '@/components/LayoutPage'
import { db } from '@/lib/database'
import { getCurrentUser } from '@/lib/session'
import { AssetsTable } from './components/assets-table'
import { CreateAssetButton } from './components/create-asset'

export default async function AssetsPage() {
  const user = await getCurrentUser()

  const handleGetAssets = await db.asset.findMany({
    where: {
      userId: user?.id
    }
  })

  console.log(handleGetAssets)

  return (
    <LayoutPage>
      <Header heading="Ativos" text={`Gerencie seus ativos.`}>
        <CreateAssetButton />
      </Header>
      <AssetsTable assets={handleGetAssets} />
    </LayoutPage>
  )
}
