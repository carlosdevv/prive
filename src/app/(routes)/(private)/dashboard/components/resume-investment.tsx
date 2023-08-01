'use client'
import { useFetchUSDCotation } from '@/app/(services)/asset/useAsset'
import { Icons } from '@/components/Icons'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { formatCurrency } from '@/utils/format'
import { useState } from 'react'
import UpdateGoalDialog from './update-goal-dialog'

type ResumeInvestmentProps = {
  title: string
  value: number | null
  finalGoal?: number
  meta?: number | null
}

export default function ResumeInvestment({
  title,
  value,
  finalGoal,
  meta
}: ResumeInvestmentProps) {
  const { data: dollarCotation, isLoading } = useFetchUSDCotation()

  const [isEditingMode, setIsEditingMode] = useState<boolean>(false)
  const [goal, setGoal] = useState<number>(finalGoal || 0)

  function handleChangeGoal() {
    setIsEditingMode(!isEditingMode)
    setGoal(10)
    console.log('click')
  }

  return (
    <section className="flex-col mt-2 mb-6">
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
                    value! * Number(dollarCotation),
                    'USD'
                  ).toString()
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-muted-foreground">Atual</Label>
          <Input
            disabled
            value={goal}
            hasRightIcon={() => <Icons.percent size={20} />}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-muted-foreground">Meta</Label>
          <Input
            min={1}
            max={3}
            placeholder="Meta"
            disabled={!isEditingMode}
            value={Math.floor(meta!) || 0}
            hasRightIcon={() => <Icons.percent size={20} />}
            className={isEditingMode ? 'border border-foreground' : ''}
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
        <UpdateGoalDialog />
      </div>
    </section>
  )
}
