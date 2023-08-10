'use client'

import { Header } from '@/components/Header'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Asset } from '@prisma/client'
import { AssetsTableContent } from './assets-table-content'
import { CreateAssetButton } from './create-asset'
import { UserSession } from '@/app/(services)/user/types'
import { useAssetsContentComponent } from '../actions/use-assets-content'

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
      <Header heading="Ativos" text={`Gerencie seus ativos.`}>
        <div className="flex flex-col gap-2">
          <Label>Valor do aporte</Label>
          <Input placeholder="R$ 0,00" />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Classes a Aportar</Label>
          <Input placeholder="0" />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Ativos Finais</Label>
          <Input placeholder="0" />
        </div>
        <CreateAssetButton refetchAssets={refetchAssets} />
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
