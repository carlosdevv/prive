import { Icons } from '@/components/Icons'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useDeleteAssetComponent } from './use-delete-asset'

export function DeleteAssetButton() {
  const {
    isOpenDeleteAssetDialog,
    handleOpenDeleteSheet,
    handleCloseDeleteSheet,
    handleRemoveAsset,
    isDeletingAsset
  } = useDeleteAssetComponent()

  return (
    <>
      <AlertDialog
        open={isOpenDeleteAssetDialog}
        onOpenChange={open =>
          open ? handleOpenDeleteSheet() : handleCloseDeleteSheet()
        }
      >
        <AlertDialogTrigger>
          <Button className="bg-red-400 text-white hover:bg-red-500">
            Deletar ativo
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir ativo</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esse ativo?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => handleCloseDeleteSheet()}>
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
      </AlertDialog>
    </>
  )
}
