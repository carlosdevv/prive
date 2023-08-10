'use client'

import { Icons } from '@/components/Icons'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/utils/format'
import { ClassEnum } from '@prisma/client'
import { useDashboardCardsComponent } from '../actions/use-dashboard-cards'

type DashboardCardsProps = {
  goals:
    | {
        id: string
        class: ClassEnum
        value: number | null
        goal: number | null
        userId: string
      }[]
}

export function DashboardCards({ goals }: DashboardCardsProps) {
  const {
    patrimonyValue,
    isLoading,
    dollarCotation,
    patrimonyInBr,
    patrimonyInUS
  } = useDashboardCardsComponent({ goals })

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
            patrimonyValue,
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
              : formatCurrency(patrimonyValue * Number(dollarCotation), 'USD')
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
