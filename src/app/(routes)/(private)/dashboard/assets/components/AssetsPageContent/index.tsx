'use client'

import { Header } from '@/components/Header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ClassEnum } from '@prisma/client'
import { AssetsTableContent } from '../AssetsTableContent'
import { useAssetsContentComponent } from './use-assets-content'
import { CreateAssetButton } from '../CreateAssetButton'
import { AssetInfoManager } from '../AssetInfoManager'

export default function AssetsPageContent() {
  useAssetsContentComponent()

  const TabsData = {
    tabsData: [
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
    ]
  }

  return (
    <>
      <Header heading="Ativos" text={`Gerencie seus ativos.`}>
        <CreateAssetButton />
      </Header>
      <AssetInfoManager />
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
