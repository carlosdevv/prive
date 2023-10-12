'use client'

import { fetchCryptos, fetchStocks, getAssets } from '@/app/(services)/asset'
import { UpdateAssetValue } from '@/app/(services)/asset/repository/update-asset-value'
import { UpdateClassValue } from '@/app/(services)/class/repository/update-class-value'
import { Asset, ClassEnum } from '@prisma/client'
import { QueryClient, useQueryClient } from '@tanstack/react-query'
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
  handleGetAssets: (className?: ClassEnum) => Promise<void>
  handleRefetchAssetsOnCreate: (className: ClassEnum) => Promise<void>
  assetInfoManagerProps: AssetInfoManagerProps
  setAssetInfoManagerProps: Dispatch<SetStateAction<AssetInfoManagerProps>>
  handleSetAssetsList: (assets: Asset[]) => void
  isLoadingAssets?: boolean
  tabSelected: ClassEnum
  handleSetTabSelected: (tab: ClassEnum) => void
  queryClient: QueryClient
}

type AssetProviderProps = {
  children: ReactNode
}

export const AssetContext = createContext<AssetContextType>(
  {} as AssetContextType
)

export const AssetProvider = ({ children }: AssetProviderProps) => {
  const queryClient = useQueryClient()
  const { userProps } = useAppContext()

  const [assetsList, setAssetsList] = useState<Asset[]>([])
  const [tabSelected, setTabSelected] = useState<ClassEnum>(
    ClassEnum.RENDA_FIXA
  )
  const [isLoadingAssets, setIsLoadingAssets] = useState<boolean>(false)
  const [assetInfoManagerProps, setAssetInfoManagerProps] =
    useState<AssetInfoManagerProps>({
      investmentValue: 1000,
      investmentClassAmount: 1,
      investmentAssetsAmount: 1
    })

  const handleSetAssetsList = useCallback((assets: Asset[]) => {
    setAssetsList(assets)
  }, [])

  const handleUpdateAssetPrice = useCallback(
    async (ticker: string, newValue: number, className?: ClassEnum) => {
      if (!className) return

      await UpdateAssetValue(ticker, newValue)

      const updatedAssetsWithNewValue = await queryClient.fetchQuery({
        queryKey: ['getAssets'],
        queryFn: () => getAssets({ class: className })
      })

      if (!updatedAssetsWithNewValue) return

      handleSetAssetsList(updatedAssetsWithNewValue)
    },
    [handleSetAssetsList, queryClient]
  )

  const handleSumAssetsAndUpdateClass = useCallback(
    async (assets: Asset[], classType?: ClassEnum) => {
      if (!userProps || !classType) return

      const assetsSum = assets.reduce((acc, curr) => {
        return acc + (curr.value ?? 0)
      }, 0)

      await UpdateClassValue(userProps.id, classType, assetsSum)
    },
    [userProps]
  )

  const handleGetAssets = useCallback(
    async (className?: ClassEnum) => {
      setIsLoadingAssets(true)

      const assets = await queryClient.fetchQuery({
        queryKey: ['getAssets'],
        queryFn: () => getAssets({ class: className })
      })

      if (assets.length < 1) {
        setIsLoadingAssets(false)
        handleSetAssetsList([])
        await handleSumAssetsAndUpdateClass(assets, className)
        return
      }

      const isRendaFixa = assets.some(
        asset => asset.class === ClassEnum.RENDA_FIXA
      )

      const isCrypto = assets.some(asset => asset.class === ClassEnum.CRYPTO)

      if (isRendaFixa) {
        setIsLoadingAssets(false)
        handleSetAssetsList(assets)

        await handleSumAssetsAndUpdateClass(assets, ClassEnum.RENDA_FIXA)
        return
      }

      if (isCrypto) {
        const cryptoData = await queryClient.fetchQuery({
          queryKey: ['fetchCryptos'],
          queryFn: () => fetchCryptos(assets.map(asset => asset.name)),
          staleTime: 1000 * 60 * 60 // 1 hour
        })

        if (!cryptoData) return

        cryptoData.coins.map(async item => {
          const asset = assets.find(asset => asset.name === item.coin)

          if (asset && asset.value !== item.value) {
            await handleUpdateAssetPrice(
              item.coin,
              item.value,
              ClassEnum.CRYPTO
            )

            setIsLoadingAssets(false)
            await handleSumAssetsAndUpdateClass(assets, ClassEnum.CRYPTO)
            return
          }
        })
      } else {
        const stockData = await queryClient.fetchQuery({
          queryKey: ['fetchStocks'],
          queryFn: () => fetchStocks(assets.map(asset => asset.name)),
          staleTime: 1000 * 60 * 60 // 1 hour
        })

        if (!stockData) return

        stockData.result.map(async item => {
          const asset = assets.find(asset => asset.name === item.ticker)

          if (asset && asset.value !== item.value) {
            await handleUpdateAssetPrice(item.ticker, item.value, className)

            setIsLoadingAssets(false)
            await handleSumAssetsAndUpdateClass(assets, className)
            return
          }
        })
      }
    },

    [
      handleSetAssetsList,
      handleSumAssetsAndUpdateClass,
      handleUpdateAssetPrice,
      queryClient
    ]
  )

  const handleSetTabSelected = useCallback((tab: ClassEnum) => {
    setTabSelected(tab)
  }, [])

  const handleRefetchAssetsOnCreate = useCallback(
    async (className: ClassEnum) => {
      setIsLoadingAssets(true)

      const assets = await queryClient.fetchQuery({
        queryKey: ['getAssets'],
        queryFn: () => getAssets({ class: className })
      })

      handleSetAssetsList(assets)
      await handleSumAssetsAndUpdateClass(assets, className)
      setIsLoadingAssets(false)
      return
    },
    [handleSetAssetsList, handleSumAssetsAndUpdateClass, queryClient]
  )

  return (
    <AssetContext.Provider
      value={{
        assetsList,
        handleGetAssets,
        assetInfoManagerProps,
        setAssetInfoManagerProps,
        handleSetAssetsList,
        isLoadingAssets,
        tabSelected,
        handleSetTabSelected,
        queryClient,
        handleRefetchAssetsOnCreate
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
