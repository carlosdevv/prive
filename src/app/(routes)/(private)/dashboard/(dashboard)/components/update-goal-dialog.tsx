import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { useState } from 'react'
import { useUpdateGoalDialogComponent } from '../actions/use-update-goal-dialog'

type UpdateGoalDialogProps = {
  goal: number
}

export default function UpdateGoalDialog({ goal }: UpdateGoalDialogProps) {
  const { isOpenDialog, handleOpenDialog, handleCloseDialog } =
    useUpdateGoalDialogComponent()

  const [sliderValue, setSliderValue] = useState(Math.round(goal))

  return (
    <div className="self-center">
      <Dialog open={isOpenDialog} onOpenChange={handleOpenDialog}>
        <Button variant={'ghost'} onClick={() => handleOpenDialog()}>
          <Icons.edit size={20} />
        </Button>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Atualizar Meta</DialogTitle>
            <DialogDescription>
              Insira o novo valor para seu objetivo final sobre essa classe de
              ativo.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-5 my-6">
            <div className="flex w-full items-center">
              <Label>Definir Meta</Label>
              <span className="ml-auto text-xl font-medium text-foreground/70">
                {sliderValue}%
              </span>
            </div>
            <Slider
              defaultValue={[sliderValue]}
              max={100}
              step={1}
              onValueChange={value => setSliderValue(value[0])}
            />
          </div>
          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant={'outline'}
              onClick={() => {
                handleCloseDialog()
                setSliderValue(Math.round(goal))
              }}
            >
              Cancelar
            </Button>
            <Button type="button">Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
