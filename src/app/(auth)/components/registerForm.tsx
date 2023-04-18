'use client'

import { toast } from '@/hooks/useToast'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { FcGoogle, FiEye, FiEyeOff, FiLoader } from '@/components/Icons'
import { buttonVariants } from '@/components/Ui/Button'
import { Input } from '@/components/Ui/Input'
import { Label } from '@/components/Ui/Label'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const registerUserAuthSchema = z
  .object({
    email: z.string().nonempty('Email é obrigatório').email('Email inválido'),
    password: z
      .string()
      .nonempty('Senha é obrigatória')
      .min(6, 'Senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z
      .string()
      .nonempty('Senha é obrigatória')
      .min(6, 'Senha deve ter no mínimo 6 caracteres')
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "As senhas precisam ser iguais",
    path: ['confirmPassword']
  })

type RegisterFormData = z.infer<typeof registerUserAuthSchema>

export function RegisterForm({ className, ...props }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerUserAuthSchema)
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)
  const [isShowingPassword, setIsShowingPassword] = useState<boolean>(false)

  const searchParams = useSearchParams()

  async function onSubmit(data: RegisterFormData) {
    setIsLoading(true)

    const signInResult = await signIn('email', {
      email: data.email.toLowerCase(),
      password: data.password,
      redirect: false,
      callbackUrl: searchParams?.get('from') || '/dashboard'
    })

    setIsLoading(false)

    if (!signInResult?.ok) {
      return toast({
        title: 'Something went wrong.',
        description: 'Your sign in request failed. Please try again.',
        variant: 'destructive'
      })
    }

    return toast({
      title: 'Check your email',
      description: 'We sent you a login link. Be sure to check your spam too.'
    })
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isGoogleLoading}
              {...register('email')}
            />
            {errors?.email && (
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
              placeholder="Senha"
              autoCapitalize="none"
              autoCorrect="off"
              {...register('password')}
              hasRightIcon={() => (
                <button
                  type="button"
                  onClick={() => setIsShowingPassword(!isShowingPassword)}
                >
                  {isShowingPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              )}
            />
            {errors?.password && (
              <p className="px-1 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="senha">
              Senha
            </Label>
            <Input
              id="confirmPassword"
              type={isShowingPassword ? 'text' : 'password'}
              placeholder="Confirmar Senha"
              autoCapitalize="none"
              autoCorrect="off"
              {...register('confirmPassword')}
              hasRightIcon={() => (
                <button
                  type="button"
                  onClick={() => setIsShowingPassword(!isShowingPassword)}
                >
                  {isShowingPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              )}
            />
            {errors?.confirmPassword && (
              <p className="px-1 text-xs text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && <FiLoader className="mr-2 h-4 w-4 animate-spin" />}
            Registrar
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-300" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-slate-600">Ou continue com</span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: 'outline' }))}
        onClick={() => {
          setIsGoogleLoading(true)
          signIn('google')
        }}
        disabled={isLoading || isGoogleLoading}
      >
        {isGoogleLoading ? (
          <FiLoader className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FcGoogle className="mr-2 h-4 w-4" />
        )}{' '}
        Google
      </button>
    </div>
  )
}
