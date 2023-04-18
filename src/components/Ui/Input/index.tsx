import { cn } from '@/lib/utils'
import React from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  hasRightIcon?: () => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasRightIcon, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex h-10 w-full items-center rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900',
          className
        )}
      >
        <>
          <input
            className="w-full bg-transparent text-[--text] focus:outline-none"
            ref={ref}
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