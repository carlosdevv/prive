'use client'

import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Asset, ClassEnum } from '@prisma/client'
import { DeleteAssetButton } from '../../../components/DeleteAssetButton'
import { useUpdateAssetPageContentComponent } from './use-update-asset-page'

type UpdateAssetPageContentProps = {
  asset: Asset
}

export const UpdateAssetPageContent = ({
  asset
}: UpdateAssetPageContentProps) => {
  const { form, onUpdateAsset, handleCancelUpdateAsset, assetPropsToUpdate } =
    useUpdateAssetPageContentComponent()

  const isAssetRentFixed = asset.class === ClassEnum.RENDA_FIXA

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onUpdateAsset)} className="space-y-8">
          <FormItem>
            <FormLabel>Ativo</FormLabel>
            <Input value={asset.name} disabled />
            <FormDescription>
              Para atualizar o nome do seu ativo, você deve criar um novo.
            </FormDescription>
            <FormMessage />
          </FormItem>

          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name={'value'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isAssetRentFixed ? 'Valor' : 'Quantidade'}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} autoFocus placeholder="R$ 1000,00" />
                  </FormControl>
                  <FormDescription>
                    Insira o valor atualizado do seu ativo.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={'goal'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Objetivo (%)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="0% - 100%"
                      hasRightIcon={() => <Icons.percent size={16} />}
                    />
                  </FormControl>
                  <FormDescription>
                    Insira o novo objetivo para o seu ativo.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            <FormItem>
              <FormLabel>Objeto Atual (%)</FormLabel>
              <Input
                value={assetPropsToUpdate?.currentGoal}
                disabled
                hasRightIcon={() => <Icons.percent size={16} />}
              />
              <FormDescription>Objetivo atual do seu ativo.</FormDescription>
            </FormItem>
            <FormItem>
              <FormLabel>Diferença (%)</FormLabel>
              <Input value={assetPropsToUpdate?.dif} disabled />
              <FormDescription>
                Diferença faltante para que seu ativo atinja o objetivo.
              </FormDescription>
            </FormItem>
            <FormItem>
              <FormLabel>Aporte</FormLabel>
              <Input value={assetPropsToUpdate?.aporte} disabled />
              <FormDescription>
                Valor para que seu ativo atinja o mais próximo do objetivo.
              </FormDescription>
            </FormItem>
            <FormItem>
              <FormLabel>Buy/Hold</FormLabel>
              <Input
                value={assetPropsToUpdate?.isBuy ? 'Buy' : 'Hold'}
                disabled
                className={`font-medium ${
                  assetPropsToUpdate?.isBuy
                    ? 'text-green-400'
                    : 'text-amber-400'
                }`}
              />
              <FormDescription>
                Indicação de compra ou manutenção do ativo.
              </FormDescription>
            </FormItem>
          </div>

          <section className="flex justify-between">
            <DeleteAssetButton />
            <div className=" flex items-center gap-3">
              <Button
                variant="secondary"
                onClick={() => handleCancelUpdateAsset()}
              >
                Cancelar
              </Button>
              <Button type="submit">Atualizar</Button>
            </div>
          </section>
        </form>
      </Form>
    </section>
  )
}
