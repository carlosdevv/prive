import { LayoutPage } from '@/components/LayoutPage'
import { Suspense } from 'react'
import AssetsPageContent from './components/assets-content'
import AssetPageLoading from './loading'

export default async function AssetsPage() {
  return (
    <Suspense fallback={<AssetPageLoading />}>
      <LayoutPage>
        <AssetsPageContent />
      </LayoutPage>
    </Suspense>
  )
}
