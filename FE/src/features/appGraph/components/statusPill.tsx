import { AlertCircle, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { memo } from 'react'

import type { TNodeStatus } from '@/api/types'
import { Badge, type IBadgeProps } from '@/components/ui/badge'

const statusConfig: Record<
  TNodeStatus,
  { label: string; Icon: typeof CheckCircle2; variant: IBadgeProps['variant'] }
> = {
  success: { label: 'Success', Icon: CheckCircle2, variant: 'success' },
  degraded: { label: 'Degraded', Icon: AlertCircle, variant: 'warning' },
  error: { label: 'Error', Icon: AlertTriangle, variant: 'destructive' },
}

interface IStatusPillProps {
  status: TNodeStatus
  className?: string
}

export const StatusPill = memo(function StatusPill({
  status,
  className,
}: IStatusPillProps): JSX.Element {
  const { label, Icon, variant } = statusConfig[status]
  return (
    <Badge variant={variant} className={className}>
      <Icon className="h-3.5 w-3.5" />
      {label}
    </Badge>
  )
})
