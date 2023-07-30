import { AssetDTO } from '@/app/(services)/asset/types'
import { DataTable } from '@/components/ui/data-table'
import { assetColumns, rendaFixaColumns } from './columns'

type AssetsTableContentProps = {
  assets?: AssetDTO[]
  isRendaFixa?: boolean
}

export function AssetsTableContent({
  assets,
  isRendaFixa = false
}: AssetsTableContentProps) {
  return (
    <>
      {assets && (
        <>
          <DataTable
            columns={isRendaFixa ? rendaFixaColumns : assetColumns}
            data={assets}
            isAssetTable
          />
        </>
      )}
    </>
  )
}
