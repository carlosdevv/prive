import { AssetDTO } from '@/app/(services)/asset/types'
import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import { useAssetsStore } from '@/store/assets'
import Link from 'next/link'
import { useCallback } from 'react'

type UpdateAssetButtonParams = {
  assetProps: AssetDTO
}

export function UpdateAssetButton({ assetProps }: UpdateAssetButtonParams) {
  const { id } = assetProps

  const {
    actions: { setAssetPropsToUpdate }
  } = useAssetsStore()

  const handleSetAssetPropsToUpdate = useCallback(
    () => setAssetPropsToUpdate(assetProps),
    [assetProps, setAssetPropsToUpdate]
  )

  return (
    <Button variant={'ghost'} onClick={() => handleSetAssetPropsToUpdate}>
      <Link
        href={{
          pathname: `/dashboard/assets/${id}`,
          query: {
            updateAsset: true
          }
        }}
      >
        <Icons.edit size={16} />
      </Link>
    </Button>
  )
}
