'use client'

import { AssetDTO } from '@/app/(services)/asset/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Asset, ClassEnum } from '@prisma/client'
import { useCallback, useMemo } from 'react'
import { AssetsTableContent } from './assets-table-content'

type AssetsTableProps = {
  assets: Asset[]
}

export function AssetsTable({ assets }: AssetsTableProps) {
  const validateAssetClass = useMemo(() => {
    return {
      RENDA_FIXA: assets.filter(asset => asset.class === ClassEnum.RENDA_FIXA),
      ACOES: assets.filter(asset => asset.class === ClassEnum.ACAO),
      FII: assets.filter(asset => asset.class === ClassEnum.FII),
      STOCKS: assets.filter(asset => asset.class === ClassEnum.STOCK),
      REITS: assets.filter(asset => asset.class === ClassEnum.REIT),
      CRYPTO: assets.filter(asset => asset.class === ClassEnum.CRYPTO)
    }
  }, [])

  const handleFormatAsset = useCallback((asset: Asset[]) => {
    const isRendaFixa =
      asset && asset.some(asset => asset.class === ClassEnum.RENDA_FIXA)

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

      return {
        name: asset.name,
        value: asset.value,
        amount: asset.amount,
        goal: asset.goal,
        price: 0,
        currentGoal: 0,
        dif: 0,
        aporte: 0,
        isBuy: false
      }
    })

    return formattedAssets
  }, [])

  const TabsData = {
    tabsData: [
      {
        value: 'RENDA_FIXA',
        title: 'Renda Fixa',
        content: (
          <AssetsTableContent
            isRendaFixa
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
      <Tabs defaultValue="RENDA_FIXA">
        <TabsList className="grid w-full grid-cols-6">
          {TabsData.tabsData.map(tab => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {TabsData.tabsData.map(tab => (
          <TabsContent key={tab.value} value={tab.value}>{tab.content}</TabsContent>
        ))}
      </Tabs>
    </>
  )
}
