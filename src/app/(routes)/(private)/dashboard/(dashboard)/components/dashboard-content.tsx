'use client'

import { UserSession } from '@/app/(services)/user/types'
import { Icons } from '@/components/Icons'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
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
  const { goalsValue, goalsSum } = useDashboardContentComponent({
    user,
    goals
  })

  return (
    <>
      <DashboardCards />

      <div className="flex">
        <Card className="w-full">
          <CardHeader>
            <section className="flex items-center justify-between">
              <div className="flex flex-col space-y-1.5">
                <CardTitle>Metas</CardTitle>
                <CardDescription>
                  Ajuste suas metas de investimento.
                </CardDescription>
              </div>
              {goalsSum > 100 && (
                <div className="w-1/2">
                  <Alert variant={'destructive'}>
                    <Icons.warning className="h-4 w-4" />
                    <AlertTitle>Atenção!</AlertTitle>
                    <AlertDescription>
                      {`A soma das metas de suas classes é de ${goalsSum.toFixed(
                        2
                      )}%.
                      Ajuste-as para que a soma seja igual a 100%.`}
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </section>
          </CardHeader>
          <CardContent>
            <InvestmentGoals goals={goalsValue.length ? goalsValue : goals} />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
