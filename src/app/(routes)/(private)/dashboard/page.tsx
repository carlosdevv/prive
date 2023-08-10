import { CalendarDateRangePicker } from '@/components/CalendarDateRangePicker'
import { Header } from '@/components/Header'
import { LayoutPage } from '@/components/LayoutPage'
import { authOptions } from '@/lib/auth/next-auth'
import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'
import { GetGoals } from './actions/goals'
import { DashboardContent } from './components/dashboard-content'

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login')
  }

  const userGoals = await GetGoals(user)

  return (
    <LayoutPage>
      <Header heading="Dashboard" text={`Bem vindo, ${user.name}.`}>
        <div className="flex items-center gap-4">
          <CalendarDateRangePicker />
        </div>
      </Header>

      <DashboardContent user={user!} goals={userGoals} />
    </LayoutPage>
  )
}
