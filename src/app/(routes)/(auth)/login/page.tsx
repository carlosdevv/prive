import { Icons } from '@/components/Icons'
import { Metadata } from 'next'
import Link from 'next/link'
import { LoginForm } from '../components/form-login'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Faça o Login em sua conta'
}

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Bem vindo ao Prive
          </h1>
          <p className="text-sm text-muted-foreground">
            Informe suas credenciais para acesssar sua conta
          </p>
        </div>

        <LoginForm />

        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Não tem uma conta? Registre-se
          </Link>
        </p>
      </div>
    </div>
  )
}
