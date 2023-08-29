'use client'

import { UserSession } from '@/app/(services)/user/types'
import { Header } from '@/components/Header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Asset, ClassEnum } from '@prisma/client'
import { useAssetsContentComponent } from '../actions/use-assets-content'
import { AssetInfoManager } from './asset-info-manager'
import { AssetsTableContent } from './assets-table-content'
import { CreateAssetButton } from './create-asset'

type AssetsTableProps = {
  user: UserSession
  assets: Asset[]
}

export default function AssetsPageContent({ assets, user }: AssetsTableProps) {
  const { handleFormatAsset, validateAssetClass, refetchAssets } =
    useAssetsContentComponent({
      assets,
      user
    })

  const TabsData = {
    tabsData: [
      {
        value: ClassEnum.RENDA_FIXA,
        title: 'Renda Fixa',
        content: (
          <AssetsTableContent
            classType={ClassEnum.RENDA_FIXA}
            isRendaFixa
            assets={handleFormatAsset(validateAssetClass.RENDA_FIXA)}
          />
        )
      },
      {
        value: ClassEnum.ACAO,
        title: 'Ações',
        content: (
          <AssetsTableContent
            classType={ClassEnum.ACAO}
            assets={handleFormatAsset(validateAssetClass.ACOES)}
          />
        )
      },
      {
        value: ClassEnum.FII,
        title: 'Fundos Imobiliários',
        content: (
          <AssetsTableContent
            classType={ClassEnum.FII}
            assets={handleFormatAsset(validateAssetClass.FII)}
          />
        )
      },
      {
        value: ClassEnum.STOCK,
        title: 'Stocks',
        content: (
          <AssetsTableContent
            classType={ClassEnum.STOCK}
            assets={handleFormatAsset(validateAssetClass.STOCKS)}
          />
        )
      },
      {
        value: ClassEnum.REIT,
        title: 'Reits',
        content: (
          <AssetsTableContent
            classType={ClassEnum.REIT}
            assets={handleFormatAsset(validateAssetClass.REITS)}
          />
        )
      },
      {
        value: ClassEnum.CRYPTO,
        title: 'Crypto',
        content: (
          <AssetsTableContent
            classType={ClassEnum.CRYPTO}
            assets={handleFormatAsset(validateAssetClass.CRYPTO)}
          />
        )
      }
    ]
  }

  return (
    <>
      <Header heading="Ativos" text={`Gerencie seus ativos.`}>
        <CreateAssetButton className="self-end" refetchAssets={refetchAssets} />
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
