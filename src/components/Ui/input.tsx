import * as React from 'react'

import { cn } from '@/lib/utils'
import InputMask from 'react-input-mask'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  hasRightIcon?: () => void
  onlyNumbers?: boolean
  hasError?: boolean
  mask?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, hasRightIcon, onlyNumbers, hasError, mask, ...props },
    ref
  ) => {
    return (
      <div
        className={cn(
          'flex items-center h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          `${props.disabled && 'bg-slate-100'}`,
          `${hasError && 'border-red-400 bg-transparent'}`,
          className
        )}
      >
        <>
          <InputMask
            pattern={onlyNumbers ? '[0-9]*' : undefined}
            mask={mask || ''}
            type={type}
            inputRef={ref}
            maskChar={null}
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

export { Input }
