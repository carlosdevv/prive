import { Separator } from '@/components/ui/separator'
import { GoalsProps } from '@/contexts/useAppContext'
import { useMemo } from 'react'
import ResumeInvestment from './resume-investment'

type InvestmentGoalsProps = {
  goals: GoalsProps
}

export function InvestmentGoals({ goals }: InvestmentGoalsProps) {
  const ResumeInvestmentProps = useMemo(
    () => [
      {
        title: 'Renda Fixa',
        value: goals?.[0].value,
        meta: goals?.[0].goal,
        classType: goals?.[0].class
      },
      {
        title: 'Ações',
        value: goals?.[1].value,
        meta: goals?.[1].goal,
        classType: goals?.[1].class
      },
      {
        title: 'Fundos Imobiliários',
        value: goals?.[2].value,
        meta: goals?.[2].goal,
        classType: goals?.[2].class
      },
      {
        title: 'Stocks',
        value: goals?.[3].value,
        meta: goals?.[3].goal,
        classType: goals?.[3].class
      },
      {
        title: 'Reits',
        value: goals?.[4].value,
        meta: goals?.[4].goal,
        classType: goals?.[4].class
      },
      {
        title: 'Crypto',
        value: goals?.[5].value,
        meta: goals?.[5].goal,
        classType: goals?.[5].class
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
              classType={props.classType}
            />
            {index < 5 && <Separator className="mb-4" />}
          </>
        ))}
      </div>
    </div>
  )
}
