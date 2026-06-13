import { Handle, Position, type NodeProps } from '@xyflow/react'
import { Cpu, Globe, HardDrive, MemoryStick, Settings } from 'lucide-react'
import { memo, useState } from 'react'

import type { IServiceNodeData, TMetricKey, TServiceNode } from '@/api/types'
import { cn } from '@/lib/utils'
import { AwsLogo } from '@/features/appGraph/components/awsLogo'
import { ServiceBrandGlyph } from '@/features/appGraph/components/brandIcon'
import { MetricSlider } from '@/features/appGraph/components/metricSlider'
import { StatusPill } from '@/features/appGraph/components/statusPill'

const metricTabs: { key: TMetricKey; label: string; Icon: typeof Cpu }[] = [
  { key: 'cpu', label: 'CPU', Icon: Cpu },
  { key: 'memory', label: 'Memory', Icon: MemoryStick },
  { key: 'disk', label: 'Disk', Icon: HardDrive },
  { key: 'region', label: 'Region', Icon: Globe },
]

function metricSummary(data: IServiceNodeData): Record<TMetricKey, string> {
  return {
    cpu: data.metrics.cpu.toFixed(2),
    memory: `${data.metrics.memory.toFixed(2)} GB`,
    disk: `${data.metrics.disk.toFixed(2)} GB`,
    region: String(data.region),
  }
}

function activeMetricValue(data: IServiceNodeData, key: TMetricKey): string {
  if (key === 'region') return String(data.region)
  return data.metrics[key].toFixed(2)
}

export const ServiceNode = memo(function ServiceNode({
  data,
  selected,
}: NodeProps<TServiceNode>): JSX.Element {
  const [activeTab, setActiveTab] = useState<TMetricKey>('cpu')
  const summary = metricSummary(data)

  return (
    <div
      className={cn(
        'w-[340px] rounded-2xl border border-border bg-[hsl(240_6%_7%)] p-4 shadow-xl shadow-black/40 transition-shadow',
        selected && 'border-primary/60 ring-2 ring-primary/50'
      )}
    >
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <ServiceBrandGlyph brand={data.brand} />
          <span className="text-[15px] font-semibold text-foreground">
            {data.name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-md border border-success/25 bg-success/10 px-2 py-1 text-xs font-medium text-[hsl(142_71%_60%)]">
            ${data.pricePerHour.toFixed(2)}/HR
          </span>
          <button
            type="button"
            className="nodrag flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 text-[13px] text-muted-foreground">
        {metricTabs.map((tab) => (
          <span key={tab.key} className="truncate">
            {summary[tab.key]}
          </span>
        ))}
      </div>

      <div className="nodrag mt-2 grid grid-cols-4 gap-1 rounded-lg bg-muted p-1">
        {metricTabs.map((tab) => {
          const isActive = tab.key === activeTab
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'flex items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-colors',
                isActive
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <tab.Icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          )
        })}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <MetricSlider
          className="nodrag flex-1"
          value={data.load}
          onValueChange={() => undefined}
        />
        <div className="flex h-8 w-[68px] items-center justify-end rounded-md border border-input bg-input px-2 text-sm tabular-nums text-foreground">
          {activeMetricValue(data, activeTab)}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <StatusPill status={data.status} />
        <AwsLogo />
      </div>
    </div>
  )
})
