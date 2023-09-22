import { UserAccountNav } from '@/components/Nav/UserAccountNav/user-account-nav'
import { privateLayoutConfig } from '@/components/Nav/config'
import { MainNav } from '@/components/Nav/main-nav'
import { Nav } from '@/components/Nav/nav'
import { ThemeToggle } from '@/components/ThemeToggle'
import { BASE_ROUTES } from '@/lib/routes'
import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation'
import { PrivateProviders } from './private-providers'
import { GetAssets } from '@/app/(services)/asset/repository/get-assets'

interface PrivateLayoutProps {
  children?: React.ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    return redirect(BASE_ROUTES.LOGIN)
  }

  const assets = await GetAssets({})

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={privateLayoutConfig.mainNav} />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserAccountNav
              user={{
                name: user.name,
                email: user.email
              }}
              items={privateLayoutConfig.userNav}
            />
          </div>
        </div>
      </header>
      <div className="container grid gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <Nav items={privateLayoutConfig.dashboardNavBar} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          <PrivateProviders user={user} assets={assets}>
            {children}
          </PrivateProviders>
        </main>
      </div>
    </div>
  )
}
