import { Icons } from '@/components/Icons'
import { Button, ButtonProps } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { useCreateAssetComponent } from '../actions/use-create-asset'

interface CreateAssetButtonProps extends ButtonProps {
  refetchAssets: () => void
}

export function CreateAssetButton({ refetchAssets }: CreateAssetButtonProps) {
  const {
    isOpenSheet,
    reset,
    handleSubmit,
    onSubmit,
    assetClass,
    setAssetClass,
    register,
    errors,
    clearErrors,
    setIsErrorFetchAssetPrice,
    isLoadingCreateAsset,
    isLoadingFetchStocks,
    isLoadingFetchCryptos,
    handleCloseSheet,
    handleOpenSheet
  } = useCreateAssetComponent({ refetchAssets })

  return (
    <>
      <Sheet open={isOpenSheet} onOpenChange={handleOpenSheet}>
        <SheetTrigger asChild>
          <Button className="gap-2" onClick={() => reset()}>
            <Icons.add size={16} />
            Novo ativo
          </Button>
        </SheetTrigger>
        <SheetContent position="right" size="default">
          <SheetHeader>
            <SheetTitle>Adicionar ativo</SheetTitle>
            <SheetDescription>
              Insira as informações do seu ativo.
            </SheetDescription>
          </SheetHeader>
          <Separator className="my-4" />

          <form onSubmit={handleSubmit(onSubmit)}>
            <section className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label>Classe</Label>

                <Select value={assetClass} onValueChange={setAssetClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a classe do ativo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Classes</SelectLabel>
                      <SelectItem value="RENDA_FIXA">Renda Fixa</SelectItem>
                      <SelectItem value="ACAO">Ações</SelectItem>
                      <SelectItem value="FII">Fundos Imobiliários</SelectItem>
                      <SelectItem value="STOCK">Stocks</SelectItem>
                      <SelectItem value="REIT">Reits</SelectItem>
                      <SelectItem value="CRYPTO">Crypto</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Label>Ativo</Label>
                  {assetClass !== 'RENDA_FIXA' && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Icons.help size={16} className="cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Para classes de ativos diferentes de renda fixa,
                            insira o ticker.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
                <Input
                  {...register('name')}
                  id="name"
                  placeholder={
                    assetClass === 'RENDA_FIXA'
                      ? 'Ex: Tesouro Selic'
                      : 'Insira o Ticker do ativo. Ex: PETR4 / AAPL'
                  }
                />
                {errors.name && (
                  <p className="px-1 text-xs text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label>{`${
                  assetClass === 'RENDA_FIXA' ? 'Valor' : 'Quantidade'
                }`}</Label>
                <Input
                  {...register('amount')}
                  id={'amount'}
                  placeholder={
                    assetClass === 'RENDA_FIXA'
                      ? 'Valor do ativo (R$)'
                      : 'Quantidade do ativo'
                  }
                  type="string"
                  onlyNumbers
                />
                {errors.amount && (
                  <p className="px-1 text-xs text-red-600">
                    {errors.amount.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label>Objetivo</Label>
                <Input
                  {...register('goal')}
                  id="goal"
                  placeholder="Ex: 10%"
                  hasRightIcon={() => <Icons.percent size={16} />}
                  type="number"
                />
                {errors.goal && (
                  <p className="px-1 text-xs text-red-600">
                    {errors.goal.message}
                  </p>
                )}
              </div>
            </section>

            <SheetFooter className="mt-6">
              <Button
                type="button"
                variant={'outline'}
                onClick={() => {
                  clearErrors()
                  handleCloseSheet()
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={() => setIsErrorFetchAssetPrice(false)}
                type="submit"
                disabled={isLoadingCreateAsset}
                className={cn({
                  'cursor-not-allowed opacity-60': isLoadingCreateAsset
                })}
              >
                {isLoadingCreateAsset ||
                isLoadingFetchStocks ||
                isLoadingFetchCryptos ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <span>Adicionar</span>
                )}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </>
  )
}
