import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { formatCurrency } from '@/utils/format'
import { useAssetInfoManagerComponent } from '../actions/use-asset-info-manager'

export function AssetInfoManager() {
  const { register, watch, handleSubmit, onSubmit } =
    useAssetInfoManagerComponent()
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="flex items-end w-full px-2">
          <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              <Label>Valor do aporte</Label>
              <Input
                {...register('investmentValue')}
                placeholder="R$ 0,00"
                value={formatCurrency(watch('investmentValue'), 'BRL')}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Classes a Aportar</Label>
              <Input {...register('investmentClassAmount')} placeholder="0" />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Ativos Finais</Label>
              <Input {...register('investmentAssetsAmount')} placeholder="0" />
            </div>
          </div>
          <Button className="ml-auto gap-2" variant={'secondary'}>
            <Icons.refresh size={16} />
            Atualizar
          </Button>
        </section>
      </form>
    </>
  )
}
