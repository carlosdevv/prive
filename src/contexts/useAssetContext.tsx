'use client'

import { UpdateAssetValue } from '@/app/(services)/asset/repository/update-asset-value'
import { CryptoResponse, TickerResponse } from '@/app/(services)/asset/types'
import {
  useFetchCryptos,
  useFetchStocks,
  useGetAssets
} from '@/app/(services)/asset/useAsset'
import { Asset, ClassEnum } from '@prisma/client'
import { AxiosError } from 'axios'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState
} from 'react'
import { UseMutateAsyncFunction } from 'react-query'

export type AssetInfoManagerProps = {
  investmentValue: number
  investmentClassAmount: number
  investmentAssetsAmount: number
}

type AssetContextType = {
  assetsList: Asset[]
  refetchAssets: (className?: ClassEnum) => Promise<void>
  assetInfoManagerProps: AssetInfoManagerProps
  setAssetInfoManagerProps: Dispatch<SetStateAction<AssetInfoManagerProps>>
  handleSetAssetsList: (assets: Asset[]) => void
  isLoadingGetAssets?: boolean
  fetchStocks: UseMutateAsyncFunction<TickerResponse, AxiosError, string[]>
  fetchCryptos: UseMutateAsyncFunction<CryptoResponse, AxiosError, string[]>
  isLoadingRefetchAssets?: boolean
}

type AssetProviderProps = {
  children: ReactNode
}

export const AssetContext = createContext<AssetContextType>(
  {} as AssetContextType
)

export const AssetProvider = ({ children }: AssetProviderProps) => {
  const [assetsList, setAssetsList] = useState<Asset[]>([])
  const [isLoadingRefetchAssets, setIsLoadingRefetchAssets] =
    useState<boolean>(false)
  const [assetInfoManagerProps, setAssetInfoManagerProps] =
    useState<AssetInfoManagerProps>({
      investmentValue: 1000,
      investmentClassAmount: 1,
      investmentAssetsAmount: 1
    })

  const { mutateAsync: GetAssets, isLoading: isLoadingGetAssets } =
    useGetAssets()
  const { mutateAsync: fetchStocks } = useFetchStocks()
  const { mutateAsync: fetchCryptos } = useFetchCryptos()

  const handleSetAssetsList = useCallback((assets: Asset[]) => {
    setAssetsList(assets)
  }, [])

  const handleUpdateAssetValue = useCallback(
    async (ticker: string, newValue: number, className?: ClassEnum) => {
      if (!className) return

      await UpdateAssetValue(ticker, newValue)
      const updatedAssetWithNewValue = await GetAssets({ class: className })

      if (updatedAssetWithNewValue) return updatedAssetWithNewValue
    },
    [GetAssets]
  )

  const refetchAssets = useCallback(
    async (className?: ClassEnum) => {
      setIsLoadingRefetchAssets(true)
      setAssetsList([])
      const refetchedAssets = await GetAssets({ class: className })
      if (refetchedAssets.length < 1) {
        setIsLoadingRefetchAssets(false)
        setAssetsList([])
        return
      }

      const isRendaFixa = refetchedAssets.some(
        asset => asset.class === ClassEnum.RENDA_FIXA
      )

      const isCrypto = refetchedAssets.some(
        asset => asset.class === ClassEnum.CRYPTO
      )

      if (isRendaFixa) {
        setIsLoadingRefetchAssets(false)
        setAssetsList(refetchedAssets)
        return
      }

      if (isCrypto) {
        const cryptoData = await fetchCryptos(
          refetchedAssets.map(item => item.name)
        )

        if (cryptoData) {
          cryptoData.coins.map(async item => {
            const asset = refetchedAssets.find(
              asset => asset.name === item.coin
            )
            if (asset && asset.value !== item.value) {
              const updatedAssetsPrices = await handleUpdateAssetValue(
                item.coin,
                item.value,
                ClassEnum.CRYPTO
              )

              if (!updatedAssetsPrices) return

              setIsLoadingRefetchAssets(false)
              setAssetsList(updatedAssetsPrices)
            }
          })
        }
      } else {
        const stockData = await fetchStocks(
          refetchedAssets.map(item => item.name)
        )

        if (stockData) {
          stockData.result.map(async item => {
            const asset = refetchedAssets.find(
              asset => asset.name === item.ticker
            )

            if (asset && asset.value !== item.value) {
              const updatedAssetsPrices = await handleUpdateAssetValue(
                item.ticker,
                item.value,
                className
              )

              if (!updatedAssetsPrices) return
              setIsLoadingRefetchAssets(false)
              setAssetsList(updatedAssetsPrices)
            }
          })
        }
      }
    },

    [GetAssets, fetchCryptos, fetchStocks, handleUpdateAssetValue]
  )

  return (
    <AssetContext.Provider
      value={{
        assetsList,
        refetchAssets,
        assetInfoManagerProps,
        setAssetInfoManagerProps,
        handleSetAssetsList,
        isLoadingGetAssets,
        fetchStocks,
        fetchCryptos,
        isLoadingRefetchAssets
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
