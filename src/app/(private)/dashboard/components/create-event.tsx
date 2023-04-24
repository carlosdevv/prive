'use client'

import { Icons } from '@/components/Icons'
import { Button, buttonVariants } from '@/components/Ui/button'
import { Input } from '@/components/Ui/input'
import { Label } from '@/components/Ui/label'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/Ui/sheet'
import { toast } from '@/hooks/useToast'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface CreateEventButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

interface CreateEventFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const createEventSchema = z.object({
  eventName: z.string().nonempty('Nome do evento é obrigatório')
})

type CreateEventFormData = z.infer<typeof createEventSchema>

export function CreateEventButton({
  className,
  ...props
}: CreateEventButtonProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateEventFormData>({
    resolver: zodResolver(createEventSchema)
  })

  async function onSubmit(data: CreateEventFormData) {
    setIsLoading(true)

    toast({
      title: 'Sucesso!',
      description: 'Seu evento foi criado com sucesso.'
    })

    setIsLoading(false)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className={cn(
            buttonVariants(),
            {
              'cursor-not-allowed opacity-60': isLoading
            },
            className
          )}
          type="button"
          {...props}
        >
          <Icons.add className="mr-2 h-4 w-4" />
          Novo Evento
        </Button>
      </SheetTrigger>
      <SheetContent position="right" size="default">
        <form onSubmit={handleSubmit(onSubmit)}>
          <SheetHeader>
            <SheetTitle>Criar Evento</SheetTitle>
            <SheetDescription>
              Insira as informações e detalhes do seu evento.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="flex-col gap-2">
              <Label htmlFor="name" className="text-right">
                Nome do evento
              </Label>
              <Input
                id="eventName"
                placeholder='Ex: Festa de aniversário'
                className="col-span-3"
                {...register('eventName')}
              />
            </div>
          </div>
          <SheetFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Criar Evento
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
