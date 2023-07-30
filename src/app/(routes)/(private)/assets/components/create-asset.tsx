'use client'

import * as React from 'react'

import { AssetProps } from '@/app/(services)/asset/types'
import { Icons } from '@/components/Icons'
import { Button, ButtonProps, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { toast } from '@/hooks/useToast'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { ClassEnum } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCreateAsset } from '@/app/(services)/asset/useAsset'

interface CreateAssetButtonProps extends ButtonProps {}

const createAssetSchema = z.object({
  name: z.string().nonempty('É necessário informar um ativo.'),
  amount: z.coerce
    .number()
    .nonnegative('Insira um valor positivo.')
    .min(1, 'É necessário informar um valor.'),
  goal: z.coerce
    .number()
    .nonnegative('A meta deve ser positiva.')
    .min(1, 'É necessário informar o objetivo')
    .max(100, 'O objetivo deve ter no máximo 100%.')
})

type CreateAssetFormData = z.infer<typeof createAssetSchema>

export function CreateAssetButton({
  className,
  variant,
  ...props
}: CreateAssetButtonProps) {
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors }
  } = useForm<CreateAssetFormData>({
    resolver: zodResolver(createAssetSchema)
  })
  const [assetClass, setAssetClass] = React.useState('RENDA_FIXA')

  const { mutate: createAsset, isLoading } = useCreateAsset({
    onSuccess: () => {
      toast({
        title: 'Sucesso.',
        description: 'Ativo criado com sucesso.'
      })
    },
    onError: () => {
      toast({
        title: 'Something went wrong.',
        description: 'Erro.',
        variant: 'destructive'
      })
    }
  })

  function onSubmit(data: CreateAssetFormData) {
    const isRendaFixa = assetClass === 'RENDA_FIXA'

    const newAsset: AssetProps = {
      name: data.name,
      class: assetClass as ClassEnum,
      amount: isRendaFixa ? undefined : data.amount,
      value: isRendaFixa ? data.amount : undefined,
      goal: data.goal
    }

    createAsset(newAsset)
    reset()
  }

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <button
            className={cn(buttonVariants({ variant }), className)}
            {...props}
          >
            <Icons.add className="mr-2 h-4 w-4" />
            Novo ativo
          </button>
        </SheetTrigger>
        <SheetContent position="right" size="default">
          <SheetHeader>
            <SheetTitle>Adicionar ativo</SheetTitle>
            <SheetDescription>
              Insira as informações do seu ativo.
            </SheetDescription>
          </SheetHeader>
          <Separator className="my-4" />

          <form onSubmit={handleSubmit(onSubmit)}>
            <section className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label>Classe</Label>

                <Select value={assetClass} onValueChange={setAssetClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a classe do ativo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Classes</SelectLabel>
                      <SelectItem value="RENDA_FIXA">Renda Fixa</SelectItem>
                      <SelectItem value="ACOES">Ações</SelectItem>
                      <SelectItem value="FII">Fundos Imobiliários</SelectItem>
                      <SelectItem value="STOCKS">Stocks</SelectItem>
                      <SelectItem value="REITS">Reits</SelectItem>
                      <SelectItem value="CRYPTO">Crypto</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Label>Ativo</Label>
                  {assetClass !== 'RENDA_FIXA' && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Icons.help size={16} className="cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Para classes de ativos diferentes de renda fixa,
                            insira o ticker.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
                <Input
                  {...register('name')}
                  id="name"
                  placeholder={
                    assetClass === 'RENDA_FIXA'
                      ? 'Ex: Tesouro Selic'
                      : 'Ex: PETR4 / AAPL'
                  }
                />
                {errors.name && (
                  <p className="px-1 text-xs text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label>{`${
                  assetClass === 'RENDA_FIXA' ? 'Valor' : 'Quantidade'
                }`}</Label>
                <Input
                  {...register('amount')}
                  id={'amount'}
                  placeholder={
                    assetClass === 'RENDA_FIXA'
                      ? 'Valor do ativo (R$)'
                      : 'Quantidade do ativo'
                  }
                  type="number"
                />
                {errors.amount && (
                  <p className="px-1 text-xs text-red-600">
                    {errors.amount.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label>Objetivo</Label>
                <Input
                  {...register('goal')}
                  id="goal"
                  placeholder="Ex: 10%"
                  hasRightIcon={() => <Icons.percent size={16} />}
                  type="number"
                />
                {errors.goal && (
                  <p className="px-1 text-xs text-red-600">
                    {errors.goal.message}
                  </p>
                )}
              </div>
            </section>

            <SheetFooter className="mt-6">
              <SheetTrigger>
                <Button
                  type="button"
                  variant={'outline'}
                  onClick={() => clearErrors()}
                >
                  Cancelar
                </Button>
              </SheetTrigger>
              <Button
                type="submit"
                disabled={isLoading}
                className={cn({
                  'cursor-not-allowed opacity-60': isLoading
                })}
              >
                {isLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <span>Adicionar</span>
                )}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </>
  )
}
