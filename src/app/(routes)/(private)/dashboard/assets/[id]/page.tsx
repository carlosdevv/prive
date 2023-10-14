import { GetAsset } from '@/app/(services)/asset/repository/get-asset'
import { Header } from '@/components/Header'
import { Separator } from '@/components/ui/separator'
import { BASE_ROUTES, DASHBOARD_ROUTES } from '@/lib/routes'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import AssetPageLoading from '../loading'
import { UpdateAssetPageContent } from './components/UpdateAssetPageContent'

type UpdateAssetPageParams = {
  params: {
    id: string
  }
}

export default async function UpdateAssetPage({
  params
}: UpdateAssetPageParams) {
  const asset = await GetAsset({ assetId: params.id })

  if (!asset) {
    redirect(`${BASE_ROUTES.DASHBOARD}${DASHBOARD_ROUTES.ASSETS}}`)
  }

  return (
    <Suspense fallback={<AssetPageLoading />}>
      <>
        <Header heading="Ativo" text={`Atualize os atributos do seu ativo.`} />
        <Separator className="my-6" />
        <UpdateAssetPageContent asset={asset} />
      </>
    </Suspense>
  )
}
