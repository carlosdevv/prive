'use client'

import { useFetchUSDCotation } from '@/app/(services)/asset/useAsset'
import { Icons } from '@/components/Icons'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/utils/format'
import { ClassEnum } from '@prisma/client'

type DashboardCardsProps = {
  patrimony?: number | null
  goals:
    | {
        id: string
        class: ClassEnum
        value: number | null
        userId: string
      }[]
}

export function DashboardCards({ patrimony, goals }: DashboardCardsProps) {
  const { data: dollarCotation, isLoading } = useFetchUSDCotation()

  const patrimonyInBr = goals.reduce((acc, goal) => {
    if (goal.class === ClassEnum.RENDA_FIXA) {
      acc + (goal.value || 0)
    }
    if (goal.class === ClassEnum.ACAO) {
      acc + (goal.value || 0)
    }
    if (goal.class === ClassEnum.FII) {
      acc + (goal.value || 0)
    }
    return acc
  }, 0)

  const patrimonyInUS = goals.reduce((acc, goal) => {
    if (goal.class === ClassEnum.STOCK) {
      acc + (goal.value || 0)
    }
    if (goal.class === ClassEnum.CRYPTO) {
      acc + (goal.value || 0)
    }
    if (goal.class === ClassEnum.REIT) {
      acc + (goal.value || 0)
    }
    return acc
  }, 0)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Patrimônio Atual
          </CardTitle>
          <Icons.money className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{`${formatCurrency(
            patrimony || 0,
            'BRL'
          )}`}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Patrimônio Dólar
          </CardTitle>
          <Icons.money className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{`${
            isLoading
              ? formatCurrency(0, 'USD')
              : formatCurrency(patrimony! * Number(dollarCotation), 'USD')
          }`}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Brasil</CardTitle>
          <Icons.piggy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{`${
            isLoading
              ? formatCurrency(0, 'USD')
              : formatCurrency(patrimonyInBr, 'BRL')
          }`}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Exterior</CardTitle>
          <Icons.wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {`${
              isLoading
                ? formatCurrency(0, 'USD')
                : formatCurrency(patrimonyInUS, 'USD')
            }`}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
