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
import { CurrencyInput, Input } from '@/components/ui/input'
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
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { useCreateAssetComponent } from './use-create-asset'

export function CreateAssetButton() {
  const {
    isOpenSheet,
    form,
    onSubmit,
    assetClass,
    setAssetClass,
    isLoadingCreateAsset,
    handleCloseSheet,
    handleOpenSheet,
    handleChangeCurrencyMode,
    currencyMode,
    isSearchingAsset
  } = useCreateAssetComponent()

  return (
    <>
      <div className="self-end">
        <Sheet
          open={isOpenSheet}
          onOpenChange={open => (open ? handleOpenSheet() : handleCloseSheet())}
        >
          <SheetTrigger asChild>
            <Button className="gap-2">
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

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
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
                          <SelectItem value="FII">
                            Fundos Imobiliários
                          </SelectItem>
                          <SelectItem value="STOCK">Stocks</SelectItem>
                          <SelectItem value="REIT">Reits</SelectItem>
                          <SelectItem value="CRYPTO">Crypto</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Ativo</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={
                              assetClass === 'RENDA_FIXA'
                                ? 'Ex: Tesouro Selic'
                                : 'Insira o Ticker do ativo. Ex: PETR4 / AAPL'
                            }
                            {...field}
                          />
                        </FormControl>
                        {!fieldState.error && (
                          <FormDescription>
                            Para classes de ativos diferentes de renda fixa,
                            insira o ticker.
                          </FormDescription>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {assetClass === 'RENDA_FIXA' && (
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="currency-mode"
                        checked={currencyMode === 'BRL'}
                        onCheckedChange={handleChangeCurrencyMode}
                      />
                      <Label htmlFor="currency-mode">
                        {currencyMode === 'BRL' ? 'R$ BRL' : '$ USD'}
                      </Label>
                    </div>
                  )}

                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>{`${
                          assetClass === 'RENDA_FIXA' ? 'Valor' : 'Quantidade'
                        }`}</FormLabel>
                        <FormControl>
                          {assetClass === 'RENDA_FIXA' ? (
                            <CurrencyInput currency={currencyMode} {...field} />
                          ) : (
                            <Input placeholder="Quantidade" {...field} />
                          )}
                        </FormControl>
                        {assetClass === 'RENDA_FIXA' && !fieldState.error && (
                          <FormDescription>
                            Insira um valor entre R$0 e 10mi.
                          </FormDescription>
                        )}
                        {assetClass !== 'RENDA_FIXA' && !fieldState.error && (
                          <FormDescription>
                            Insira a quantidade.
                          </FormDescription>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="goal"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel>Objetivo</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: 10%"
                            hasRightIcon={() => <Icons.percent size={16} />}
                            {...field}
                          />
                        </FormControl>
                        {!fieldState.error && (
                          <FormDescription>
                            Insira um valor de 0 a 100%.
                          </FormDescription>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </section>

                <SheetFooter className="mt-6">
                  <Button
                    type="button"
                    variant={'outline'}
                    onClick={() => handleCloseSheet()}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoadingCreateAsset || isSearchingAsset}
                    className={cn({
                      'cursor-not-allowed opacity-60':
                        isLoadingCreateAsset || isSearchingAsset
                    })}
                  >
                    {isLoadingCreateAsset || isSearchingAsset ? (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <span>Adicionar</span>
                    )}
                  </Button>
                </SheetFooter>
              </form>
            </Form>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
