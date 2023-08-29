'use client'
import { Icons } from '@/components/Icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { formatCurrency } from '@/utils/format'
import { ClassEnum } from '@prisma/client'
import { useResumeInvestmentComponent } from '../actions/use-resume-investment'

type ResumeInvestmentProps = {
  title: string
  value?: number | null
  meta?: number | null
  classType: ClassEnum
}

export default function ResumeInvestment({
  title,
  value,
  meta,
  classType
}: ResumeInvestmentProps) {
  const {
    handleUpdateUserGoal,
    isEditingMode,
    handleSetIsEditingMode,
    isLoading,
    dollarCotation,
    register,
    handleSubmit,
    errors,
    isEditingLoading,
    handleGetCurrentGoal
  } = useResumeInvestmentComponent({
    classType,
    meta,
    value
  })
  return (
    <section className="flex-col mt-2 mb-6">
      <form onSubmit={handleSubmit(handleUpdateUserGoal)}>
        <h1 className="font-semibold mb-2">{title}</h1>
        <div className="grid lg:grid-cols-[1fr_1fr_0.75fr_0.75fr_0.25fr_0.75fr_0.75fr_0.25fr] gap-6 grid-cols-8">
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Valor (R$)</Label>
            <Input
              disabled
              value={formatCurrency(value || 0, 'BRL').toString()}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Valor ($)</Label>
            <Input
              disabled
              value={
                isLoading
                  ? formatCurrency(0, 'USD').toString()
                  : formatCurrency(
                      (value ?? 0) / Number(dollarCotation),
                      'USD'
                    ).toString()
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Atual</Label>
            <Input
              disabled
              value={handleGetCurrentGoal?.toFixed(2).toString() ?? 0}
              hasRightIcon={() => <Icons.percent size={20} />}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label
                className={`${
                  errors.goal ? 'text-red-400' : 'text-muted-foreground'
                }`}
              >
                Meta
              </Label>
              {!!errors.goal && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Icons.warning size={16} className="text-red-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{errors.goal.message}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <Input
              {...register('goal')}
              placeholder="Meta"
              disabled={!isEditingMode}
              autoFocus={isEditingMode}
              hasError={!!errors.goal}
              hasRightIcon={() => <Icons.percent size={20} />}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label className="text-muted-foreground">Buy/Hold</Label>
            <Badge className="bg-green-400 justify-center">Buy</Badge>
          </div>
          <div className="flex flex-col gap-4">
            <Label className="text-muted-foreground">Dif (R$)</Label>
            <span className="font-medium">{formatCurrency(0, 'BRL')}</span>
          </div>
          <div className="flex flex-col gap-4">
            <Label className="text-muted-foreground">Aporte (R$)</Label>
            <span className="font-medium">{formatCurrency(0, 'BRL')}</span>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Atualizar</Label>
            {isEditingMode ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant={'ghost'} type="submit">
                      <Icons.checkCircle size={20} className="text-green-300" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Confirmar</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <Button
                variant={'ghost'}
                disabled={isEditingLoading}
                onClick={() => handleSetIsEditingMode()}
              >
                {isEditingLoading ? (
                  <Icons.spinner size={16} className="animate-spin" />
                ) : (
                  <Icons.edit size={20} />
                )}
              </Button>
            )}
          </div>
        </div>
      </form>
    </section>
  )
}
