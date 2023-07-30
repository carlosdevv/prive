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
import { useCreateUser } from '@/app/(services)/user/useCreateUser'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const registerUserAuthSchema = z
  .object({
    name: z.string().nonempty('Nome obrigatório'),
    email: z.string().nonempty('Email obrigatório').email('Email inválido'),
    password: z
      .string()
      .nonempty('Senha obrigatória')
      .min(6, 'Senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z
      .string()
      .nonempty('Confirmação de senha obrigatória')
      .min(6, 'Senha deve ter no mínimo 6 caracteres')
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas precisam ser iguais',
    path: ['confirmPassword']
  })

type RegisterFormData = z.infer<typeof registerUserAuthSchema>

export function RegisterForm({ className, ...props }: RegisterFormProps) {
  const route = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerUserAuthSchema)
  })

  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)
  const [isShowingPassword, setIsShowingPassword] = useState<boolean>(false)

  const { mutate: createUser, isLoading } = useCreateUser({
    onSuccess: () => {
      route.push('/login')
      toast({
        title: 'Sucesso.',
        description: 'O usuário foi criado com sucesso, faça seu login.'
      })
    },
    onError: error => {
      console.log(error.message)
      toast({
        title: 'Algo deu errado.',
        description: error.message,
        variant: 'destructive'
      })
    }
  })

  function onSubmit(data: RegisterFormData) {
    createUser({
      name: data.name,
      email: data.email,
      password: data.confirmPassword
    })
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
            <Label className="sr-only" htmlFor="name">
              Nome
            </Label>
            <Input
              id="name"
              placeholder="Nome Completo"
              type="text"
              autoComplete="off"
              autoCorrect="off"
              {...register('name')}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Email"
              type="email"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
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
              autoCorrect="off"
              autoComplete="off"
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
              autoCorrect="off"
              autoComplete="off"
              {...register('confirmPassword')}
              hasRightIcon={() => (
                <button
                  type="button"
                  onClick={() => setIsShowingPassword(!isShowingPassword)}
                >
                  {isShowingPassword ? <Icons.eyeOff /> : <Icons.eye />}
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
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Registrar
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
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
        onClick={() => {
          setIsGoogleLoading(true)
          signIn('google')
        }}
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
