interface HeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function Header({ heading, text, children }: HeaderProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="font-heading text-2xl md:text-3xl font-bold">
          {heading}
        </h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  )
}
