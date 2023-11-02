import * as React from 'react'

import { cn } from '@/lib/utils'
import { ControllerRenderProps } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { InternalNumberFormatBase } from 'react-number-format/types/types'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  hasRightIcon?: () => void
  hasError?: boolean
}

type CurrencyInputProps = ControllerRenderProps & {
  hasRightIcon?: () => void
  hasError?: boolean
  currency: 'BRL' | 'USD'
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, hasRightIcon, hasError, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex items-center h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          `${props.disabled && 'bg-muted'}`,
          `${hasError && 'border-red-400 bg-transparent'}`,
          className
        )}
      >
        <>
          <input
            type={type}
            ref={ref}
            className="w-full bg-transparent text-[--text] focus:outline-none"
            {...props}
          />

          {hasRightIcon && hasRightIcon()}
        </>
      </div>
    )
  }
)

Input.displayName = 'Input'

const CurrencyInput = React.forwardRef<
  InternalNumberFormatBase,
  CurrencyInputProps
>(({ hasRightIcon, hasError, currency, ...props }, ref) => {
  return (
    <div
      className={cn(
        'flex items-center h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        `${props.disabled && 'bg-muted'}`,
        `${hasError && 'border-red-400 bg-transparent'}`
      )}
    >
      <>
        <NumericFormat
          thousandSeparator={currency === 'USD' ? ',' : '.'}
          decimalSeparator={currency === 'USD' ? '.' : ','}
          prefix={currency === 'USD' ? '$ ' : 'R$ '}
          decimalScale={2}
          getInputRef={ref}
          {...props}
          className="w-full bg-transparent text-[--text] focus:outline-none"
        />

        {hasRightIcon && hasRightIcon()}
      </>
    </div>
  )
})

CurrencyInput.displayName = 'CurrencyInput'

export { CurrencyInput, Input }
