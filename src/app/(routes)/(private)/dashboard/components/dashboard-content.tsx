'use client'

import { UserSession } from '@/app/(services)/user/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { ClassEnum } from '@prisma/client'
import { DashboardCards } from './dashboard-cards'
import { useDashboardContentComponent } from '../actions/use-dashboard-content'

type DashboardContentProps = {
  user: UserSession
  goals: {
    id: string
    class: ClassEnum
    value: number | null
    goal: number | null
    userId: string
  }[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function DashboardContent({ goals, user }: DashboardContentProps) {
  // eslint-disable-next-line no-empty-pattern
  const {} = useDashboardContentComponent({ user })
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
          <CardContent>{/* <InvestmentGoals goals={goals} /> */}</CardContent>
        </Card>
      </div>
    </>
  )
}
