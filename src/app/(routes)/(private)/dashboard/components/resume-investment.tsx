'use client'
import { Icons } from '@/components/Icons'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { formatCurrency } from '@/utils/format'
import { useState } from 'react'

type ResumeInvestmentProps = {
  title: string
  value: number
  currentGoal: number
  meta?: number
}

export default function ResumeInvestment({
  title,
  value,
  currentGoal,
  meta
}: ResumeInvestmentProps) {
  const [isEditingMode, setIsEditingMode] = useState<boolean>(false)
  const [goal, setGoal] = useState<number | undefined>(meta)

  function handleChangeGoal() {
    setIsEditingMode(!isEditingMode)
    setGoal(10)
    console.log('click')
  }
  return (
    <section className="flex-col mt-2 mb-6">
      <h1 className="font-semibold mb-2">{title}</h1>
      <div className="grid lg:grid-cols-[1fr_1fr_0.75fr_0.75fr_0.25fr_0.75fr_0.75fr] gap-6 grid-cols-4">
        <div className="flex flex-col gap-2">
          <Label className="text-muted-foreground">Valor (R$)</Label>
          <Input disabled value={formatCurrency(value, 'BRL').toString()} />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-muted-foreground">Valor ($)</Label>
          <Input disabled value={formatCurrency(value, 'USD').toString()} />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-muted-foreground">Atual</Label>
          <Input
            disabled
            value={currentGoal}
            hasRightIcon={() => <Icons.percent size={20} />}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label className="text-muted-foreground">Meta</Label>
            <button
              type="button"
              value={goal}
              onClick={() => handleChangeGoal()}
            >
              {isEditingMode ? (
                <Icons.checkCircle
                  size={16}
                  className="hover:text-green-300 mr-1"
                />
              ) : (
                <Icons.edit
                  size={16}
                  className="hover:text-muted-foreground mr-1"
                />
              )}
            </button>
          </div>
          <Input
            min={1}
            max={3}
            placeholder="Meta"
            disabled={!isEditingMode}
            value={meta}
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
      </div>
    </section>
  )
}
