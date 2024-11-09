interface TShowProps {
  when: boolean
  children: React.ReactNode
}

export function Show({ when, children }: TShowProps) {
  return when ? <>{children}</> : null
}
