import * as React from 'react'

import { cn } from '@/lib/utils'

interface LayoutPageProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LayoutPage({ children, className, ...props }: LayoutPageProps) {
  return (
    <div className={cn('grid items-start gap-8', className)} {...props}>
      {children}
    </div>
  )
}
