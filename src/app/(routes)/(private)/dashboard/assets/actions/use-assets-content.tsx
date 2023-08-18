import { AssetDTO } from '@/app/(services)/asset/types'
import {
  useFetchCryptos,
  useFetchStocks
} from '@/app/(services)/asset/useAsset'
import { UserSession } from '@/app/(services)/user/types'
import { useAppContext } from '@/contexts/useAppContext'
import { useAssetContext } from '@/contexts/useAssetContext'
import { Asset, ClassEnum } from '@prisma/client'
import { useCallback, useEffect, useMemo } from 'react'

type CustomHookContentComponentProps = {
  user: UserSession
  assets: Asset[]
}

export const useAssetsContentComponent = ({
  assets,
  user
}: CustomHookContentComponentProps) => {
  const { setUserProps } = useAppContext()
  const { assetsList, setAssetsList, refetchAssets, handleSetPatrimonyValue } =
    useAssetContext()

  const { mutateAsync: fetchStocks, data: fetchStockData } = useFetchStocks()
  const { mutateAsync: fetchCryptos, data: fetchCryptoData } = useFetchCryptos()

  const handleSetPatrimony = useCallback(() => {
    if (assetsList.length > 0) {
      const sumStock = fetchStockData?.result.reduce((acc, item) => {
        return acc + item.value
      }, 0)

      const sumCrypto = fetchCryptoData?.coins.reduce((acc, item) => {
        return acc + item.value
      }, 0)

      const sumRendaFixa = assetsList.reduce((acc, item) => {
        if (item.class === ClassEnum.RENDA_FIXA) {
          return acc + (item.value ?? 0)
        }
        return acc
      }, 0)

      const total = sumRendaFixa + (sumCrypto ?? 0) + (sumStock ?? 0)
      handleSetPatrimonyValue(total)
    }
  }, [assetsList, fetchStockData?.result, fetchCryptoData?.coins])

  const handleGetAssetsPrices = useCallback(async () => {
    if (assetsList.length > 0) {
      const cryptoAssets = assetsList
        .filter(item => item.class === ClassEnum.CRYPTO)
        .map(item => item.name)

      const stockAssets = assetsList
        .filter(
          item => item.class !== (ClassEnum.RENDA_FIXA || ClassEnum.CRYPTO)
        )
        .map(item => item.name)
      if (stockAssets.length > 0) {
        await fetchStocks(stockAssets)
      }

      if (cryptoAssets.length > 0) {
        await fetchCryptos(cryptoAssets)
      }
      handleSetPatrimony()
    }
  }, [assetsList])

  const validateAssetClass = useMemo(() => {
    return {
      RENDA_FIXA: assetsList.filter(
        asset => asset.class === ClassEnum.RENDA_FIXA
      ),
      ACOES: assetsList.filter(asset => asset.class === ClassEnum.ACAO),
      FII: assetsList.filter(asset => asset.class === ClassEnum.FII),
      STOCKS: assetsList.filter(asset => asset.class === ClassEnum.STOCK),
      REITS: assetsList.filter(asset => asset.class === ClassEnum.REIT),
      CRYPTO: assetsList.filter(asset => asset.class === ClassEnum.CRYPTO)
    }
  }, [assetsList])

  const handleFormatAsset = useCallback(
    (asset: Asset[]) => {
      const isRendaFixa =
        asset && asset.some(asset => asset.class === ClassEnum.RENDA_FIXA)

      const isCryptoAsset =
        asset && asset.some(asset => asset.class === ClassEnum.CRYPTO)

      const formattedAssets: AssetDTO[] = asset.map(asset => {
        if (isRendaFixa) {
          return {
            name: asset.name,
            value: asset.value,
            goal: asset.goal,
            currentGoal: 0,
            dif: 0,
            aporte: 0,
            isBuy: false
          }
        }

        if (isCryptoAsset) {
          return {
            name: asset.name.toUpperCase(),
            amount: asset.amount,
            goal: asset.goal,
            price:
              (fetchCryptoData &&
                fetchCryptoData.coins.find(item => item.coin === asset.name)
                  ?.value) ||
              0,
            currentGoal: 0,
            dif: 0,
            aporte: 0,
            isBuy: false
          }
        }

        return {
          name: asset.name.toUpperCase(),
          amount: asset.amount,
          goal: asset.goal,
          price:
            (fetchStockData &&
              fetchStockData.result.find(item => item.ticker === asset.name)
                ?.value) ||
            0,
          currentGoal: 0,
          dif: 0,
          aporte: 0,
          isBuy: false
        }
      })

      return formattedAssets
    },
    [fetchStockData, fetchCryptoData]
  )

  useEffect(() => {
    setUserProps(user)
    setAssetsList(assets)
  }, [])

  useEffect(() => {
    handleGetAssetsPrices()
  }, [assetsList])

  useEffect(() => {
    if (fetchStockData || fetchCryptoData) {
      handleSetPatrimony()
    }
  }, [fetchStockData, fetchCryptoData])

  return { handleFormatAsset, validateAssetClass, refetchAssets }
}
