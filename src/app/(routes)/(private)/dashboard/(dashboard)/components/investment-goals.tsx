import { Separator } from '@/components/ui/separator'
import { ClassEnum } from '@prisma/client'
import { useMemo } from 'react'
import ResumeInvestment from './resume-investment'

type InvestmentGoalsProps = {
  goals: {
    id: string
    class: ClassEnum
    value: number | null
    goal: number | null
    userId: string
  }[]
}

export function InvestmentGoals({ goals }: InvestmentGoalsProps) {
  const ResumeInvestmentProps = useMemo(
    () => [
      {
        title: 'Renda Fixa',
        value: goals.find(goal => goal.class === ClassEnum.RENDA_FIXA)?.value,
        meta: goals.find(goal => goal.class === ClassEnum.RENDA_FIXA)?.goal
      },
      {
        title: 'Ações',
        value: goals.find(goal => goal.class === ClassEnum.ACAO)?.value,
        meta: goals.find(goal => goal.class === ClassEnum.ACAO)?.goal
      },
      {
        title: 'Fundos Imobiliários',
        value: goals.find(goal => goal.class === ClassEnum.FII)?.value,
        meta: goals.find(goal => goal.class === ClassEnum.FII)?.goal
      },
      {
        title: 'Stocks',
        value: goals.find(goal => goal.class === ClassEnum.STOCK)?.value,
        meta: goals.find(goal => goal.class === ClassEnum.STOCK)?.goal
      },
      {
        title: 'Reits',
        value: goals.find(goal => goal.class === ClassEnum.REIT)?.value,
        meta: goals.find(goal => goal.class === ClassEnum.REIT)?.goal
      },
      {
        title: 'Crypto',
        value: goals.find(goal => goal.class === ClassEnum.CRYPTO)?.value,
        meta: goals.find(goal => goal.class === ClassEnum.CRYPTO)?.goal
      }
    ],
    [goals]
  )

  return (
    <div className="space-y-8">
      <div className="flex-col items-center">
        {ResumeInvestmentProps.map((props, index) => (
          <>
            <ResumeInvestment
              key={props.title}
              title={props.title}
              value={props.value}
              meta={props.meta}
            />
            {index < 5 && <Separator className="mb-4" />}
          </>
        ))}
      </div>
    </div>
  )
}
