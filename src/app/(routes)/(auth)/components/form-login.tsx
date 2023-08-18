'use client'

import { toast } from '@/hooks/useToast'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Icons } from '@/components/Icons'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const loginUserAuthSchema = z.object({
  email: z.string().nonempty('Email é obrigatório').email('Email inválido'),
  password: z
    .string()
    .nonempty('Senha é obrigatória')
    .min(6, 'Senha deve ter no mínimo 6 caracteres')
})

type LoginFormData = z.infer<typeof loginUserAuthSchema>

export function LoginForm({ className, ...props }: LoginFormProps) {
  const route = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginUserAuthSchema)
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)
  const [isShowingPassword, setIsShowingPassword] = useState<boolean>(false)

  async function handleLoginWithGoogle() {
    setIsGoogleLoading(true)

    try {
      await signIn('google')
    } catch (error) {
      return toast({
        title: 'Something went wrong.',
        description: 'Your sign in request failed. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsGoogleLoading(false)
    }
  }

  async function onSubmit(data: LoginFormData) {
    setIsLoading(true)

    const status = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: '/dashboard'
    })

    if (status) {
      setIsLoading(false)

      if (status.ok) return route.push(status.url!)

      if (!status.ok) {
        return toast({
          title: 'Algo deu errado.',
          description: status.error!.toString(),
          variant: 'destructive'
        })
      }
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        autoCorrect="off"
      >
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Email"
              type="email"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading || isGoogleLoading}
              {...register('email')}
            />
            {errors.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="senha">
              Senha
            </Label>
            <Input
              id="password"
              type={isShowingPassword ? 'text' : 'password'}
              autoComplete="off"
              placeholder="Senha"
              autoCorrect="off"
              {...register('password')}
              hasRightIcon={() => (
                <button
                  type="button"
                  onClick={() => setIsShowingPassword(!isShowingPassword)}
                >
                  {isShowingPassword ? <Icons.eyeOff /> : <Icons.eye />}
                </button>
              )}
            />
            {errors.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Acessar
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t " />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ou continue com
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: 'outline' }))}
        onClick={handleLoginWithGoogle}
        disabled={isLoading || isGoogleLoading}
      >
        {isGoogleLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{' '}
        Google
      </button>
    </div>
  )
}
