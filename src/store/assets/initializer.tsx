'use client'

import { Asset } from '@prisma/client'
import { useRef } from 'react'
import { useAssetsStore } from '.'

type InitializerAssetsStoreProps = {
  assets: Asset[]
}

export const InitializerAssetsStore = ({
  assets
}: InitializerAssetsStoreProps) => {
  const initializer = useRef(false)

  if (!initializer.current) {
    useAssetsStore.getState().actions.setAssets(assets)
    initializer.current = true
  }

  return null
}
