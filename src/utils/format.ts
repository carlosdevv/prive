import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatDateAbreviated(date: Date): string {
  const upperCaseFirstLetter = format(date, 'LLL dd, y', { locale: ptBR })
    .charAt(0)
    .toUpperCase()
  const restOfString = format(date, 'LLL dd, y', { locale: ptBR }).slice(1)
  const dateFormatted = upperCaseFirstLetter + restOfString
  return dateFormatted
}

export function formatCurrency(value: number, currency: string): string {
  const valueFormatted = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: currency
  })
  return valueFormatted
}
