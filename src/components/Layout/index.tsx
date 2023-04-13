import { ReactNode } from "react"

const ContentLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex-col flex-auto mx-auto w-full max-w-screen-xl p-6">
      {children}
    </main>
  )
}

export { ContentLayout }
