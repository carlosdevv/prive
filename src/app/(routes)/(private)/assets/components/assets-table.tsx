'use client'

import { AssetProps } from '@/app/(models)/asset'
import { EmptyPlaceholder } from '@/components/EmptyPlaceholder'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { db } from '@/lib/database'
import { getCurrentUser } from '@/lib/session'
import { useState } from 'react'
import { CreateAssetButton } from './create-asset'

export async function AssetsTable() {
  const [assets, setAssets] = useState<AssetProps | []>([])
  const user = await getCurrentUser()

  const handleAssets = await db.asset.findMany({
    where: {
      id: user?.id
    }
  })

  const invoices = [
    {
      invoice: 'INV001',
      paymentStatus: 'Paid',
      totalAmount: '$250.00',
      paymentMethod: 'Credit Card'
    },
    {
      invoice: 'INV002',
      paymentStatus: 'Pending',
      totalAmount: '$150.00',
      paymentMethod: 'PayPal'
    },
    {
      invoice: 'INV003',
      paymentStatus: 'Unpaid',
      totalAmount: '$350.00',
      paymentMethod: 'Bank Transfer'
    },
    {
      invoice: 'INV004',
      paymentStatus: 'Paid',
      totalAmount: '$450.00',
      paymentMethod: 'Credit Card'
    },
    {
      invoice: 'INV005',
      paymentStatus: 'Paid',
      totalAmount: '$550.00',
      paymentMethod: 'PayPal'
    },
    {
      invoice: 'INV006',
      paymentStatus: 'Pending',
      totalAmount: '$200.00',
      paymentMethod: 'Bank Transfer'
    },
    {
      invoice: 'INV007',
      paymentStatus: 'Unpaid',
      totalAmount: '$300.00',
      paymentMethod: 'Credit Card'
    }
  ]

  return (
    <>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map(invoice => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">{invoice.invoice}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell className="text-right">
                {invoice.totalAmount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="wallet" />
        <EmptyPlaceholder.Title>Sem ativos ainda.</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          Voce ainda não tem ativos. Comece adicionando um.
        </EmptyPlaceholder.Description>
        <CreateAssetButton variant="outline" />
      </EmptyPlaceholder>
    </>
  )
}
