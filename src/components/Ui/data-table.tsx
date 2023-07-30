'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { CreateAssetButton } from '@/app/(routes)/(private)/assets/components/create-asset'
import { EmptyPlaceholder } from '../EmptyPlaceholder'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isAssetTable?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isAssetTable = false
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <>
                  {isAssetTable ? (
                    <EmptyPlaceholder>
                      <EmptyPlaceholder.Icon name="wallet" />
                      <EmptyPlaceholder.Title>
                        Sem ativos ainda.
                      </EmptyPlaceholder.Title>
                      <EmptyPlaceholder.Description>
                        Voce ainda não tem ativos. Comece adicionando um.
                      </EmptyPlaceholder.Description>
                      <CreateAssetButton variant="outline" />
                    </EmptyPlaceholder>
                  ) : (
                    <span>No results.</span>
                  )}
                </>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
