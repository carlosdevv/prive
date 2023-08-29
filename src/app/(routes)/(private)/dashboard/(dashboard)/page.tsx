import { CalendarDateRangePicker } from '@/components/CalendarDateRangePicker'
import { Header } from '@/components/Header'
import { LayoutPage } from '@/components/LayoutPage'
import { getCurrentUser } from '@/lib/session'
import { DashboardContent } from './components/dashboard-content'
import { GetUserClasses } from './actions/classes'

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('User not found')
  }

  const userClassGoals = await GetUserClasses(user)

  return (
    <LayoutPage>
      <Header heading="Dashboard" text={`Bem vindo, ${user.name}.`}>
        <div className="flex items-center gap-4">
          <CalendarDateRangePicker />
        </div>
      </Header>

      <DashboardContent user={user} goals={userClassGoals} />
    </LayoutPage>
  )
}
