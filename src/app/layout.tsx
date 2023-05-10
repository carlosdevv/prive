import { Inter as FontSans } from 'next/font/google'

import { TailwindIndicator } from '@/components/TailwindIndicator'
import { Toaster } from '@/components/ui/toaster'
import { siteConfig } from '@/lib/config'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import { Providers } from './providers'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-inter'
})

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: [
    'Next.js',
    'React',
    'Tailwind CSS',
    'Server Components',
    'Radix UI'
  ],
  authors: [
    {
      name: 'Carlos Lopes',
      url: 'https://carloslopes.vercel.app'
    }
  ],
  creator: 'Carlos Lopes',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="pt-br"
      suppressHydrationWarning
      className={cn(
        'min-h-screen bg-background font-sans antialiased',
        fontSans.variable
      )}
    >
      <head />
      <body className="min-h-screen">
        <Providers>
          {children}
          <Toaster />
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  )
}
