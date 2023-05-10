import { CalendarDateRangePicker } from '@/components/CalendarDateRangePicker'
import { Header } from '@/components/Header'
import { LayoutPage } from '@/components/LayoutPage'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { authOptions } from '@/lib/auth/next-auth'
import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'
import { DashboardCards } from './components/dashboard-cards'
import { InvestmentGoals } from './components/investment-goals'

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login')
  }
  return (
    <LayoutPage>
      <Header heading="Dashboard" text={`Bem vindo, ${user.name}.`}>
        <div className="flex items-center gap-4">
          <CalendarDateRangePicker />
        </div>
      </Header>

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
            <InvestmentGoals />
          </CardContent>
        </Card>
      </div>
    </LayoutPage>
  )
}
