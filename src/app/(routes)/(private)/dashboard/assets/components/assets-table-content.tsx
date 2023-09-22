import { DataTable } from '@/components/ui/data-table'
import { Skeleton } from '@/components/ui/skeleton'
import { ClassEnum } from '@prisma/client'
import { useAssetsTableContentComponent } from '../actions/use-assets-table-content'
import { assetColumns, rendaFixaColumns } from './columns'

type AssetsTableContentProps = {
  classType: ClassEnum
  isRendaFixa?: boolean
}

export function AssetsTableContent({
  classType,
  isRendaFixa = false
}: AssetsTableContentProps) {
  const { formattedAssets, isLoadingGetAssets, isLoadingRefetchAssets } =
    useAssetsTableContentComponent({ classType })
  return (
    <>
      {isLoadingGetAssets || isLoadingRefetchAssets ? (
        <Skeleton className="w-full rounded-md h-96" />
      ) : (
        <DataTable
          columns={isRendaFixa ? rendaFixaColumns : assetColumns}
          data={formattedAssets}
          isAssetTable
        />
      )}
    </>
  )
}
