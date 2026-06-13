import { cva, type VariantProps } from 'class-variance-authority'
import { type HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium',
  {
    variants: {
      variant: {
        default: 'border-border bg-muted text-foreground',
        success:
          'border-success/25 bg-success/10 text-[hsl(142_71%_60%)]',
        warning:
          'border-warning/25 bg-warning/10 text-[hsl(38_96%_62%)]',
        destructive:
          'border-destructive/25 bg-destructive/10 text-[hsl(0_84%_70%)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

interface IBadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: IBadgeProps): JSX.Element {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants, type IBadgeProps }
