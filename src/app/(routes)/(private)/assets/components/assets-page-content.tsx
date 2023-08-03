'use client'

import { handleGetAssets } from '@/app/(services)/asset/repository/get-assets'
import { AssetDTO } from '@/app/(services)/asset/types'
import {
  useFetchCryptos,
  useFetchStocks
} from '@/app/(services)/asset/useAsset'
import { UserSession } from '@/app/(services)/user/types'
import { Header } from '@/components/Header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Asset, ClassEnum } from '@prisma/client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { AssetsTableContent } from './assets-table-content'
import { CreateAssetButton } from './create-asset'

type AssetsTableProps = {
  assets: Asset[]
  user: UserSession
}

export default function AssetsPageContent({ assets, user }: AssetsTableProps) {
  const [assetsList, setAssetsList] = useState<Asset[]>(assets)

  const handleGetAssetsPrices = async () => {
    const cryptoAssets = assetsList
      .filter(item => item.class === ClassEnum.CRYPTO)
      .map(item => item.name)

    const stockAssets = assetsList
      .filter(item => item.class !== (ClassEnum.RENDA_FIXA && ClassEnum.CRYPTO))
      .map(item => item.name)

    if (stockAssets.length > 0) {
      console.log(stockAssets[0])
      await fetchStocks(stockAssets)
    }

    if (cryptoAssets.length > 0) {
      await fetchCryptos(cryptoAssets)
    }
  }

  const { mutateAsync: fetchStocks, data: fetchStockData } = useFetchStocks()
  const { mutateAsync: fetchCryptos, data: fetchCryptoData } = useFetchCryptos()

  const refetchAssets = useCallback(async () => {
    const refetchedAssets = await handleGetAssets(user)
    setAssetsList(refetchedAssets)
  }, [])

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
    handleGetAssetsPrices()
  }, [assetsList])

  const TabsData = {
    tabsData: [
      {
        value: 'RENDA_FIXA',
        title: 'Renda Fixa',
        content: (
          <AssetsTableContent
            assets={handleFormatAsset(validateAssetClass.RENDA_FIXA)}
          />
        )
      },
      {
        value: 'ACOES',
        title: 'Ações',
        content: (
          <AssetsTableContent
            assets={handleFormatAsset(validateAssetClass.ACOES)}
          />
        )
      },
      {
        value: 'FII',
        title: 'Fundos Imobiliários',
        content: (
          <AssetsTableContent
            assets={handleFormatAsset(validateAssetClass.FII)}
          />
        )
      },
      {
        value: 'STOCKS',
        title: 'Stocks',
        content: (
          <AssetsTableContent
            assets={handleFormatAsset(validateAssetClass.STOCKS)}
          />
        )
      },
      {
        value: 'REITS',
        title: 'Reits',
        content: (
          <AssetsTableContent
            assets={handleFormatAsset(validateAssetClass.REITS)}
          />
        )
      },
      {
        value: 'CRYPTO',
        title: 'Crypto',
        content: (
          <AssetsTableContent
            assets={handleFormatAsset(validateAssetClass.CRYPTO)}
          />
        )
      }
    ]
  }

  return (
    <>
      <Header heading="Ativos" text={`Gerencie seus ativos.`}>
        <CreateAssetButton refetchAssets={refetchAssets} user={user} />
      </Header>
      <Tabs defaultValue="RENDA_FIXA">
        <TabsList className="grid w-full grid-cols-6">
          {TabsData.tabsData.map(tab => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {TabsData.tabsData.map(tab => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </>
  )
}
