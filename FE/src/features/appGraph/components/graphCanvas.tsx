import {
  addEdge,
  Background,
  BackgroundVariant,
  Panel,
  ReactFlow,
  useReactFlow,
  type Connection,
  type Edge,
  type OnSelectionChangeParams,
} from '@xyflow/react'
import { AlertTriangle, Loader2, Maximize, Plus } from 'lucide-react'
import { memo, useCallback, useEffect } from 'react'

import { useAppGraph } from '@/api/queries'
import type { IServiceNodeData, TServiceNode } from '@/api/types'
import { Button } from '@/components/ui/button'
import { ServiceNode } from '@/features/appGraph/components/serviceNode'
import { useUiStore } from '@/store/uiStore'

const nodeTypes = { service: ServiceNode }

let nodeSeq = 0

const newNodeData: IServiceNodeData = {
  name: 'New Service',
  brand: 'postgres',
  status: 'success',
  pricePerHour: 0.03,
  region: 1,
  metrics: { cpu: 0.02, memory: 0.05, disk: 10 },
  load: 50,
  description: '',
}

export const GraphCanvas = memo(function GraphCanvas(): JSX.Element {
  const selectedAppId = useUiStore((state) => state.selectedAppId)
  const setSelectedNodeId = useUiStore((state) => state.setSelectedNodeId)
  const toggleMobilePanel = useUiStore((state) => state.toggleMobilePanel)
  const { data, isLoading, isError, refetch, isFetching } =
    useAppGraph(selectedAppId)

  const { setNodes, setEdges, fitView } = useReactFlow<TServiceNode>()

  useEffect(() => {
    if (!data) return
    setNodes(data.nodes)
    setEdges(data.edges)
    const timer = window.setTimeout(() => {
      void fitView({ padding: 0.25, duration: 300 })
    }, 60)
    return () => window.clearTimeout(timer)
  }, [data, setNodes, setEdges, fitView])

  useEffect(() => {
    function onKey(event: KeyboardEvent): void {
      const target = event.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return
      }
      if (event.key === 'f' || event.key === 'F') {
        event.preventDefault()
        void fitView({ padding: 0.25, duration: 300 })
      }
      if (event.key === 'b' || event.key === 'B') {
        event.preventDefault()
        toggleMobilePanel()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [fitView, toggleMobilePanel])

  const onSelectionChange = useCallback(
    ({ nodes }: OnSelectionChangeParams) => {
      setSelectedNodeId(nodes[0]?.id ?? null)
    },
    [setSelectedNodeId]
  )

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((edges: Edge[]) => addEdge(connection, edges))
    },
    [setEdges]
  )

  const onAddNode = useCallback(() => {
    nodeSeq += 1
    const id = `service-${nodeSeq}`
    setNodes((nodes) => [
      ...nodes,
      {
        id,
        type: 'service',
        position: { x: 280 + nodeSeq * 28, y: 120 + nodeSeq * 28 },
        data: { ...newNodeData, metrics: { ...newNodeData.metrics } },
      },
    ])
  }, [setNodes])

  return (
    <div className="absolute inset-0">
      <ReactFlow
        nodeTypes={nodeTypes}
        defaultNodes={[]}
        defaultEdges={[]}
        onConnect={onConnect}
        onSelectionChange={onSelectionChange}
        deleteKeyCode={['Delete', 'Backspace']}
        fitView
        fitViewOptions={{ padding: 0.25 }}
        minZoom={0.2}
        proOptions={{ hideAttribution: true }}
        className="bg-background"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={22}
          size={1}
          color="#26262a"
        />
        <Panel position="bottom-center">
          <div className="flex items-center gap-1 rounded-xl border border-border bg-card p-1.5 shadow-lg shadow-black/30">
            <Button variant="secondary" size="sm" onClick={onAddNode}>
              <Plus className="h-4 w-4" />
              Add Node
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => void fitView({ padding: 0.25, duration: 300 })}
            >
              <Maximize className="h-4 w-4" />
              Fit
            </Button>
          </div>
        </Panel>
      </ReactFlow>

      {(isLoading || isFetching) && !isError && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground shadow-lg">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading graph...
          </div>
        </div>
      )}

      {isError && (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="flex max-w-sm flex-col items-center gap-3 rounded-xl border border-destructive/30 bg-card px-6 py-8 text-center shadow-xl">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <AlertTriangle className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Could not load graph
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                The request for this application failed.
              </p>
            </div>
            <Button size="sm" onClick={() => void refetch()}>
              Retry
            </Button>
          </div>
        </div>
      )}
    </div>
  )
})
