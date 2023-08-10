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
import { useDashboardContentComponent } from '../actions/use-dashboard-content'
import { DashboardCards } from './dashboard-cards'
import { InvestmentGoals } from './investment-goals'

type DashboardContentProps = {
  user: UserSession
  goals:
    | {
        id: string
        class: ClassEnum
        value: number | null
        goal: number | null
        userId: string
      }[]
}

export function DashboardContent({ goals, user }: DashboardContentProps) {
  const {} = useDashboardContentComponent({ user })
  return (
    <>
      <DashboardCards goals={goals} />

      <div className="flex">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Metas</CardTitle>
            <CardDescription>
              Ajuste suas metas de investimento.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* <InvestmentGoals goals={goals} /> */}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
