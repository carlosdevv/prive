import { Header } from '@/components/Header'
import { LayoutPage } from '@/components/LayoutPage'
import { AssetsTable } from './components/assets-table'
import { CreateAssetButton } from './components/create-asset'

export default function AssetsPage() {
  return (
    <LayoutPage>
      <Header heading="Ativos" text={`Gerencie seus ativos.`}>
        <CreateAssetButton />
      </Header>
      <AssetsTable />
    </LayoutPage>
  )
}
