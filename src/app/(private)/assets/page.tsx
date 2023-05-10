import { EmptyPlaceholder } from '@/components/EmptyPlaceholder'
import { Header } from '@/components/Header'
import { LayoutPage } from '@/components/LayoutPage'
import { CreateAssetButton } from './components/create-asset'

export default function AssetsPage() {
  return (
    <LayoutPage>
      <Header heading="Ativos" text={`Gerencie seus ativos.`}>
        <CreateAssetButton />
      </Header>
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="wallet" />
        <EmptyPlaceholder.Title>Sem ativos ainda.</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          Voce ainda não tem ativos. Comece adicionando um.
        </EmptyPlaceholder.Description>
        <CreateAssetButton variant="outline" />
      </EmptyPlaceholder>
    </LayoutPage>
  )
}
