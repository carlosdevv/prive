import { DataTable } from '@/components/ui/data-table'
import { Skeleton } from '@/components/ui/skeleton'
import { ClassEnum } from '@prisma/client'
import { assetColumns, rendaFixaColumns } from '../columns'
import { useAssetsTableContentComponent } from './use-assets-table-content'

type AssetsTableContentProps = {
  classType: ClassEnum
  isRendaFixa?: boolean
}

export function AssetsTableContent({
  classType,
  isRendaFixa = false
}: AssetsTableContentProps) {
  const { isLoadingAssets, formattedAssets } = useAssetsTableContentComponent({
    classType
  })

  return (
    <>
      {isLoadingAssets ? (
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
