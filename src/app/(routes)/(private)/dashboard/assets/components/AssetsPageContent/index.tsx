'use client'

import { Header } from '@/components/Header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ClassEnum } from '@prisma/client'
import { useMemo } from 'react'
import { AssetInfoManager } from '../AssetInfoManager'
import { AssetsTableContent } from '../AssetsTableContent'
import { CreateAssetButton } from '../CreateAssetButton'
import { useAssetsPageContent } from './use-assets-page-content'

export default function AssetsPageContent() {
  const { handleChangeTab, isLoadingValidateAssets } = useAssetsPageContent()

  const tabsData = useMemo(
    () => [
      {
        value: ClassEnum.RENDA_FIXA,
        title: 'Renda Fixa',
        content: (
          <AssetsTableContent classType={ClassEnum.RENDA_FIXA} isRendaFixa />
        )
      },
      {
        value: ClassEnum.ACAO,
        title: 'Ações',
        content: <AssetsTableContent classType={ClassEnum.ACAO} />
      },
      {
        value: ClassEnum.FII,
        title: 'Fundos Imobiliários',
        content: <AssetsTableContent classType={ClassEnum.FII} />
      },
      {
        value: ClassEnum.STOCK,
        title: 'Stocks',
        content: <AssetsTableContent classType={ClassEnum.STOCK} />
      },
      {
        value: ClassEnum.REIT,
        title: 'Reits',
        content: <AssetsTableContent classType={ClassEnum.REIT} />
      },
      {
        value: ClassEnum.CRYPTO,
        title: 'Crypto',
        content: <AssetsTableContent classType={ClassEnum.CRYPTO} />
      }
    ],
    []
  )

  return (
    <>
      <Header heading="Ativos" text={`Gerencie seus ativos.`}>
        <CreateAssetButton />
      </Header>

      <AssetInfoManager />
      <Tabs defaultValue="RENDA_FIXA">
        <TabsList className="grid w-full grid-cols-6">
          {tabsData.map(tab => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              onClick={() => handleChangeTab(tab.value)}
              disabled={isLoadingValidateAssets}
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabsData.map(tab => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </>
  )
}
