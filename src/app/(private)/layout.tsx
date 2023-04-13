import { ContentLayout } from "@/components/Layout"
import { SideMenu } from "@/components/SideMenu"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className="bg-[--background] text-[--text] flex items-start">
        <SideMenu />
        <ContentLayout>
          {children}
        </ContentLayout>
      </body>
    </html>
  )
}
