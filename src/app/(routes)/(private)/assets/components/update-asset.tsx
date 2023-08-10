import { Icons } from '@/components/Icons'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button, ButtonProps } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { useUpdateAssetComponent } from '../actions/use-update-asset'

interface EditAssetButtonProps extends ButtonProps {
  assetName: string
  assetValue: number
  assetGoal: number
  isRendaFixa: boolean
}

export function UpdateAssetButton({
  assetName,
  assetValue,
  assetGoal,
  isRendaFixa
}: EditAssetButtonProps) {
  const {
    isOpenAlertDialog,
    setIsOpenAlertDialog,
    isOpenSheet,
    setIsOpenSheet,
    reset,
    handleSubmit,
    onSubmit,
    register,
    errors,
    isUpdatingAsset,
    isDeletingAsset,
    handleRemoveAsset
  } = useUpdateAssetComponent({ assetName, assetGoal, assetValue })

  return (
    <AlertDialog open={isOpenAlertDialog} onOpenChange={setIsOpenAlertDialog}>
      <Sheet open={isOpenSheet} onOpenChange={setIsOpenSheet}>
        <SheetTrigger asChild>
          <Button variant="ghost" onClick={() => reset()}>
            <Icons.edit size={16} />
          </Button>
        </SheetTrigger>
        <SheetContent position="right" size="default">
          <SheetHeader>
            <SheetTitle>Editar ativo</SheetTitle>
            <SheetDescription>
              Insira as informações do seu ativo.
            </SheetDescription>
          </SheetHeader>
          <Separator className="my-4" />

          <form onSubmit={handleSubmit(onSubmit)}>
            <section className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label>Ativo</Label>

                <Input value={assetName} disabled />
              </div>

              <div className="flex flex-col gap-2">
                <Label>{`${isRendaFixa ? 'Valor' : 'Quantidade'}`}</Label>
                <Input
                  {...register('value')}
                  placeholder={
                    isRendaFixa ? 'Valor do ativo (R$)' : 'Quantidade do ativo'
                  }
                  type="string"
                  onlyNumbers
                />
                {errors.value && (
                  <p className="px-1 text-xs text-red-600">
                    {errors.value.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label>Objetivo</Label>
                <Input
                  {...register('goal')}
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

            <div className="flex justify-between items-end">
              <Button
                className="bg-red-400 text-white hover:bg-red-500"
                onClick={() => setIsOpenAlertDialog(true)}
              >
                Apagar ativo
              </Button>
              <SheetFooter className="mt-6">
                <Button variant="outline" onClick={() => setIsOpenSheet(false)}>
                  Cancelar
                </Button>

                <Button type="submit">
                  {isUpdatingAsset ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <span>Atualizar</span>
                  )}
                </Button>
              </SheetFooter>
            </div>
          </form>
        </SheetContent>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir ativo</AlertDialogTitle>
            <AlertDialogDescription>
              Tem deseja que deseja excluir esse ativo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsOpenAlertDialog(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={() => handleRemoveAsset()}
              className="bg-red-400 hover:bg-red-500"
            >
              {isDeletingAsset ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <span>Excluir</span>
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </Sheet>
    </AlertDialog>
  )
}
