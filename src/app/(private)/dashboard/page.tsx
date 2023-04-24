import { Header } from '@/components/Header'
import { LayoutPage } from '@/components/LayoutPage'
import { authOptions } from '@/lib/auth/next-auth'
import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'
import { CreateEventButton } from './components/create-event'
import { EmptyPlaceholder } from '@/components/EmptyPlaceholder'
import { buttonVariants } from '@/components/Ui/button'
import { cn } from '@/lib/utils'

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login')
  }
  return (
    <LayoutPage>
      <Header heading="Eventos" text="Crie e administre seus eventos.">
        <CreateEventButton />
      </Header>
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="events" />
        <EmptyPlaceholder.Title>Sem eventos criados</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          Voce não tem nenhum evento ainda. Crie um evento
        </EmptyPlaceholder.Description>
        <CreateEventButton
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'text-slate-900'
          )}
        />
      </EmptyPlaceholder>
    </LayoutPage>
  )
}
