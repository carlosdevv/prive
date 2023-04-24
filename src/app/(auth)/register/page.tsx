import Link from 'next/link'

import { Icons } from '@/components/Icons'
import { buttonVariants } from '@/components/Ui/button'
import { cn } from '@/lib/utils'
import { RegisterForm } from '../components/formRegister'

export const metadata = {
  title: 'Registrar',
  description: 'Crie uma conta para começar.'
}

export default function RegisterPage() {
  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute top-4 right-4 md:top-8 md:right-8'
        )}
      >
        Login
      </Link>
      <div className="hidden h-full bg-slate-100 lg:block" />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.logo className="mx-auto h-6 w-6" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar uma conta
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Insira suas informações para criar conta
            </p>
          </div>
          <RegisterForm />
          <p className="px-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Ao clicar em registar, você concorda com nossos{' '}
            <Link
              href="/terms"
              className="hover:text-brand underline underline-offset-4"
            >
              Termos de Serviço
            </Link>{' '}
            e{' '}
            <Link
              href="/privacy"
              className="hover:text-brand underline underline-offset-4"
            >
              Políticas de Privacidade
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
