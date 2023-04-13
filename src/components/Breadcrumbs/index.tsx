import Link from "next/link";
import { ReactNode } from "react";

const BreadcrumbsComponent = ({ children }: { children: ReactNode }) => {
  const breadcrumbs = [
    <Link key="1" color="inherit" href="/" >
      Home
    </Link >,
    <Link
      key="2"
      color="inherit"
      onClick={handleClick}
    >
      Meu Perfil
    </Link>,
    <h2 key="3" color="text.primary">
      Meu Perfil
    </h2>,
  ];

  function handleReturnDashboard() {

  }

  function handleClick() {

  }

  return (
    <main className="flex-col flex-auto mx-auto w-full max-w-screen-xl p-6">
      {children}
    </main>
  )
}

export { BreadcrumbsComponent };

