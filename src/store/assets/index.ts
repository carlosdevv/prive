import { AssetDTO } from '@/app/(services)/asset/types'
import { Asset, ClassEnum } from '@prisma/client'
import { create } from 'zustand'

type AssetsStoreActions = {
  setAssets: (assets: Asset[]) => void
  addAsset: (asset: Asset) => void
  setFormattedAssets: (formattedAssets: AssetDTO[]) => void
  setAssetPropsToUpdate: (assetPropsToUpdate: AssetDTO) => void
  setTabSelected: (tabSelected: ClassEnum) => void
  setIsLoadingValidateAssets: (isLoadingValidateAssets: boolean) => void
}

type AssetsStoreProps = {
  tabSelected: ClassEnum
  assets: Asset[]
  formattedAssets: AssetDTO[]
  assetPropsToUpdate?: AssetDTO
  isLoadingValidateAssets: boolean
  actions: AssetsStoreActions
}

export const useAssetsStore = create<AssetsStoreProps>(set => ({
  tabSelected: ClassEnum.RENDA_FIXA,
  assets: [],
  formattedAssets: [],
  assetPropsToUpdate: undefined,
  isLoadingValidateAssets: false,
  actions: {
    setAssets: assets => set({ assets }),
    addAsset: asset => set(state => ({ assets: [...state.assets, asset] })),
    setFormattedAssets: formattedAssets => set({ formattedAssets }),
    setAssetPropsToUpdate: assetPropsToUpdate => set({ assetPropsToUpdate }),
    setTabSelected: tabSelected => set({ tabSelected }),
    setIsLoadingValidateAssets: isLoadingValidateAssets =>
      set({ isLoadingValidateAssets })
  }
}))
