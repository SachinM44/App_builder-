import { useNodes, useReactFlow } from '@xyflow/react'
import { memo } from 'react'

import type { TNodeStatus, TServiceNode } from '@/api/types'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { MetricSlider } from '@/features/appGraph/components/metricSlider'
import { ServiceBrandGlyph } from '@/features/appGraph/components/brandIcon'
import { StatusPill } from '@/features/appGraph/components/statusPill'
import { cn } from '@/lib/utils'
import { useUiStore } from '@/store/uiStore'

const statusOptions: { value: TNodeStatus; label: string }[] = [
  { value: 'success', label: 'Success' },
  { value: 'degraded', label: 'Degraded' },
  { value: 'error', label: 'Error' },
]

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export const NodeInspector = memo(function NodeInspector(): JSX.Element {
  const selectedNodeId = useUiStore((state) => state.selectedNodeId)
  const activeInspectorTab = useUiStore((state) => state.activeInspectorTab)
  const setActiveInspectorTab = useUiStore(
    (state) => state.setActiveInspectorTab
  )
  const nodes = useNodes<TServiceNode>()
  const { updateNodeData } = useReactFlow<TServiceNode>()

  const node = selectedNodeId
    ? nodes.find((item) => item.id === selectedNodeId)
    : undefined

  if (!node) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
        <p className="text-sm font-medium text-foreground">No node selected</p>
        <p className="text-xs text-muted-foreground">
          Select a node on the canvas to inspect and edit it.
        </p>
      </div>
    )
  }

  const { data } = node

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <ServiceBrandGlyph brand={data.brand} />
          <div>
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
              Service Node
            </p>
            <p className="text-sm font-semibold text-foreground">{data.name}</p>
          </div>
        </div>
        <StatusPill status={data.status} />
      </div>

      <Tabs
        value={activeInspectorTab}
        onValueChange={(value) =>
          setActiveInspectorTab(value as typeof activeInspectorTab)
        }
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="config">Config</TabsTrigger>
          <TabsTrigger value="runtime">Runtime</TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Node name
            </label>
            <Input
              value={data.name}
              onChange={(event) =>
                updateNodeData(node.id, { name: event.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Description
            </label>
            <Textarea
              value={data.description}
              placeholder="Add a short description..."
              onChange={(event) =>
                updateNodeData(node.id, { description: event.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Status
            </label>
            <div className="grid grid-cols-3 gap-1 rounded-lg bg-muted p-1">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    updateNodeData(node.id, { status: option.value })
                  }
                  className={cn(
                    'rounded-md px-2 py-1.5 text-xs font-medium transition-colors',
                    data.status === option.value
                      ? 'bg-foreground text-background'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="runtime" className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-muted-foreground">
                Load
              </label>
              <span className="text-xs text-muted-foreground">0 – 100</span>
            </div>
            <div className="flex items-center gap-3">
              <MetricSlider
                className="flex-1"
                value={data.load}
                onValueChange={(value) =>
                  updateNodeData(node.id, { load: value })
                }
              />
              <Input
                type="number"
                min={0}
                max={100}
                value={data.load}
                onChange={(event) => {
                  const next = Number(event.target.value)
                  if (Number.isFinite(next)) {
                    updateNodeData(node.id, { load: clamp(next, 0, 100) })
                  }
                }}
                className="w-[72px] text-right tabular-nums"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {(['cpu', 'memory', 'disk'] as const).map((key) => (
              <div
                key={key}
                className="rounded-lg border border-border bg-muted/40 p-2.5"
              >
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  {key}
                </p>
                <p className="mt-1 text-sm font-medium tabular-nums text-foreground">
                  {data.metrics[key].toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
})
