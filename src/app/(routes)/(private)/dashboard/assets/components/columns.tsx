'use client'

import { AssetDTO } from '@/app/(services)/asset/types'
import { Icons } from '@/components/Icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/utils/format'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'

export const rendaFixaColumns: ColumnDef<AssetDTO>[] = [
  {
    accessorKey: 'name',
    header: 'Ativo'
  },
  {
    accessorKey: 'value',
    header: 'Valor de Mercado',
    cell: ({ row }) => {
      const val = parseFloat(row.getValue('value'))
      return formatCurrency(val, 'BRL')
    }
  },
  {
    accessorKey: 'currentGoal',
    header: 'Atual (%)'
  },
  {
    accessorKey: 'goal',
    header: 'Objetivo (%)'
  },
  {
    accessorKey: 'dif',
    header: 'Diferença (%)'
  },
  {
    accessorKey: 'aporte',
    header: 'Aporte'
  },
  {
    accessorKey: 'isBuy',
    header: 'Buy/Hold',
    cell: ({ row }) => {
      const buy: boolean = row.getValue('isBuy')
      if (buy) {
        return <Badge className="bg-green-400 justify-center">Buy</Badge>
      }
      return <Badge className="bg-amber-400 justify-center">Hold</Badge>
    }
  },
  {
    id: 'options',
    header: 'Opções',
    enableHiding: false,
    cell: ({ row }) => {
      const assetProps = row.original

      const { id, ...queryParams } = assetProps

      return (
        <Link
          href={{
            pathname: `/dashboard/assets/${id}`,
            query: {
              ...queryParams,
              updateAsset: true
            }
          }}
        >
          <Button variant={'ghost'}>
            <Icons.edit size={16} />
          </Button>
        </Link>
      )
    }
  }
]

export const assetColumns: ColumnDef<AssetDTO>[] = [
  {
    accessorKey: 'name',
    header: 'Ativo'
  },
  {
    accessorKey: 'price',
    header: 'Cotação',
    cell: ({ row }) => {
      const val = parseFloat(row.getValue('price'))
      return formatCurrency(val, 'BRL')
    }
  },
  {
    accessorKey: 'amount',
    header: 'Quantidade'
  },
  {
    accessorKey: 'value',
    header: 'Valor de Mercado',
    cell: ({ row }) => {
      const val =
        parseFloat(row.getValue('price')) * parseFloat(row.getValue('amount'))
      return formatCurrency(val, 'BRL')
    }
  },
  {
    accessorKey: 'currentGoal',
    header: 'Atual (%)'
  },
  {
    accessorKey: 'goal',
    header: 'Objetivo (%)'
  },
  {
    accessorKey: 'dif',
    header: 'Diferença (%)'
  },
  {
    accessorKey: 'aporte',
    header: 'Aporte',
    cell: ({ row }) => {
      const val = parseFloat(row.getValue('aporte'))
      return formatCurrency(val, 'BRL')
    }
  },
  {
    accessorKey: 'isBuy',
    header: 'Buy/Hold',
    cell: ({ row }) => {
      const buy = parseFloat(row.getValue('isBuy'))
      if (buy) {
        return <Badge className="bg-green-400 justify-center">Buy</Badge>
      }
      return <Badge className="bg-amber-400 justify-center">Hold</Badge>
    }
  },
  {
    id: 'options',
    header: 'Opções',
    enableHiding: false,
    cell: ({ row }) => {
      const assetProps = row.original

      return (
        <Link
          href={{
            pathname: `/dashboard/assets/${assetProps.id}`,
            query: assetProps
          }}
        >
          <Button variant={'ghost'}>
            <Icons.edit size={16} />
          </Button>
        </Link>
      )
    }
  }
]
