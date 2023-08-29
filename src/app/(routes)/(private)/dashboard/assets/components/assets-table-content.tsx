import { AssetDTO } from '@/app/(services)/asset/types'
import { DataTable } from '@/components/ui/data-table'
import { assetColumns, rendaFixaColumns } from './columns'
import { useAssetsTableContentComponent } from '../actions/use-assets-table-content'
import { ClassEnum } from '@prisma/client'

type AssetsTableContentProps = {
  classType: ClassEnum
  assets?: AssetDTO[]
  isRendaFixa?: boolean
}

export function AssetsTableContent({
  classType,
  assets,
  isRendaFixa = false
}: AssetsTableContentProps) {
  useAssetsTableContentComponent({ assets, classType })
  return (
    <>
      <DataTable
        columns={isRendaFixa ? rendaFixaColumns : assetColumns}
        data={assets || []}
        isAssetTable
      />
    </>
  )
}
