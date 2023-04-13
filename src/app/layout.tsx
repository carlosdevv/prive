import '@/styles/global.css'
import { Inter } from 'next/font/google'

export const metadata = {
  title: {
    default: 'Prive | Admin',
  },
  favicon: {
    default: '../public/favicon.ico',
  }
}

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body >
        {children}

        {/* {isPrivateRouter ? (
          <PrivateRoute>{children}</PrivateRoute>
        ) : { children }} */}
      </body>
    </html>
  )
}
