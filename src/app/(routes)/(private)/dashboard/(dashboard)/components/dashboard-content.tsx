'use client'

import { UserSession } from '@/app/(services)/user/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { GoalsProps } from '@/contexts/useAppContext'
import { useDashboardContentComponent } from '../actions/use-dashboard-content'
import { DashboardCards } from './dashboard-cards'
import { InvestmentGoals } from './investment-goals'

type DashboardContentProps = {
  user: UserSession
  goals: GoalsProps
}

export function DashboardContent({ user, goals }: DashboardContentProps) {
  const { goalsValue } = useDashboardContentComponent({
    user,
    goals
  })

  return (
    <>
      <DashboardCards />

      <div className="flex">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Metas</CardTitle>
            <CardDescription>
              Ajuste suas metas de investimento.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <InvestmentGoals goals={goalsValue.length ? goalsValue : goals} />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
