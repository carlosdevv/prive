'use client'

import { AssetDTO } from '@/app/(services)/asset/types'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/utils/format'
import { ColumnDef } from '@tanstack/react-table'
import { UpdateAssetButton } from './UpdateAssetButton'

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
    header: 'Opções',
    cell: ({ row }) => {
      const assetName = row.original.name
      const assetValue = row.original.value as number
      const assetGoal = row.original.goal as number
      return (
        <UpdateAssetButton
          assetName={assetName}
          assetValue={assetValue}
          assetGoal={assetGoal}
          isRendaFixa={true}
        />
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
    header: 'Opções',
    cell: ({ row }) => {
      const assetName = row.original.name
      const assetValue = row.original.amount as number
      const assetGoal = row.original.goal as number
      return (
        <UpdateAssetButton
          assetName={assetName}
          assetValue={assetValue}
          assetGoal={assetGoal}
          isRendaFixa={false}
        />
      )
    }
  }
]
