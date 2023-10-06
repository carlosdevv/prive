import { LayoutPage } from '@/components/LayoutPage'
import { Suspense } from 'react'
import AssetPageLoading from './loading'
import AssetsPageContent from './components/AssetsPageContent'

export default async function AssetsPage() {
  return (
    <Suspense fallback={<AssetPageLoading />}>
      <LayoutPage>
        <AssetsPageContent />
      </LayoutPage>
    </Suspense>
  )
}
