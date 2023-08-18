'use client'

import { GetAssets } from '@/app/(routes)/(private)/assets/actions/assets'
import { SetPatrimony } from '@/app/(routes)/(private)/dashboard/actions/patrimony'
import { Asset } from '@prisma/client'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState
} from 'react'
import { useAppContext } from './useAppContext'

export type AssetInfoManagerProps = {
  investmentValue: number
  investmentClassAmount: number
  investmentAssetsAmount: number
}

type AssetContextType = {
  assetsList: Asset[]
  setAssetsList: Dispatch<SetStateAction<Asset[]>>
  refetchAssets: () => Promise<void>
  handleSetPatrimonyValue: (value: number) => void
  assetInfoManagerProps: AssetInfoManagerProps
  setAssetInfoManagerProps: Dispatch<SetStateAction<AssetInfoManagerProps>>
}

type AssetProviderProps = {
  children: ReactNode
}

export const AssetContext = createContext<AssetContextType>(
  {} as AssetContextType
)

export const AssetProvider = ({ children }: AssetProviderProps) => {
  const { setPatrimonyValue, userProps } = useAppContext()
  const [assetsList, setAssetsList] = useState<Asset[]>([])
  const [assetInfoManagerProps, setAssetInfoManagerProps] =
    useState<AssetInfoManagerProps>({
      investmentValue: 1000,
      investmentClassAmount: 1,
      investmentAssetsAmount: 1
    })

  const refetchAssets = useCallback(async () => {
    if (!userProps) return

    const refetchedAssets = await GetAssets(userProps)
    setAssetsList(refetchedAssets)
  }, [])

  const handleSetPatrimonyValue = useCallback(async (value: number) => {
    if (!userProps) return

    if (userProps.patrimony !== value) {
      setPatrimonyValue(value)
      await SetPatrimony(userProps, value)
    }
  }, [])

  return (
    <AssetContext.Provider
      value={{
        assetsList,
        setAssetsList,
        refetchAssets,
        handleSetPatrimonyValue,
        assetInfoManagerProps,
        setAssetInfoManagerProps
      }}
    >
      {children}
    </AssetContext.Provider>
  )
}

export const useAssetContext = () => {
  const context = useContext(AssetContext)

  return context
}
