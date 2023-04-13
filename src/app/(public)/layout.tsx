export const metadata = {
  title: 'Prive | Auth',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[--background] text-[--text]">{children}</body>
    </html>
  )
}
