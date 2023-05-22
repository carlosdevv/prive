import { Separator } from '@/components/ui/separator'
import ResumeInvestment from './resume-investment'

export function InvestmentGoals() {
  return (
    <div className="space-y-8">
      <div className="flex-col items-center">
        <ResumeInvestment
          title={'Renda Fixa'}
          value={10331.92}
          currentGoal={0}
        />
        <Separator className="mb-4" />
        <ResumeInvestment title={'Ações'} value={10331.92} currentGoal={0} />
        <Separator className="mb-4" />
        <ResumeInvestment
          title={'Fundos Imobiliários'}
          value={10331.92}
          currentGoal={0}
        />
        <Separator className="mb-4" />
        <ResumeInvestment title={'Stocks'} value={10331.92} currentGoal={0} />
        <Separator className="mb-4" />
        <ResumeInvestment title={'Reits'} value={10331.92} currentGoal={0} />
        <Separator className="mb-4" />
        <ResumeInvestment title={'Crypto'} value={10331.92} currentGoal={0} />
      </div>
    </div>
  )
}
