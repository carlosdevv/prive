import { UserAccountNav } from '@/components/Nav/UserAccountNav/user-account-nav'
import { MainNav } from '@/components/Nav/main-nav'
import { Nav } from '@/components/Nav/nav'
import { getCurrentUser } from '@/lib/session'
import { notFound } from 'next/navigation'
import { privateLayoutConfig } from './config'

interface PrivateLayoutProps {
  children?: React.ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  return (
    <div className="mx-auto flex flex-col space-y-6">
      <header className="container sticky top-0 z-40 bg-white">
        <div className="flex h-16 items-center justify-between border-b border-b-slate-200 py-4">
          <MainNav items={privateLayoutConfig.mainNav} />
          <UserAccountNav
            user={{
              name: user.name,
              email: user.email
            }}
          />
        </div>
      </header>
      <div className="container grid gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <Nav items={privateLayoutConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
