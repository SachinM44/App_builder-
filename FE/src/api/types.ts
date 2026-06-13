import type { Edge, Node } from '@xyflow/react'

export type TNodeStatus = 'success' | 'degraded' | 'error'

export type TMetricKey = 'cpu' | 'memory' | 'disk' | 'region'

export type TServiceBrand = 'postgres' | 'redis' | 'mongodb'

export type TAppIcon = 'lightbulb' | 'cog' | 'rocket' | 'image' | 'database'

export interface IServiceNodeData {
  name: string
  brand: TServiceBrand
  status: TNodeStatus
  pricePerHour: number
  region: number
  metrics: { cpu: number; memory: number; disk: number }
  load: number
  description: string
  [key: string]: unknown
}

export type TServiceNode = Node<IServiceNodeData, 'service'>

export interface IApp {
  id: string
  name: string
  icon: TAppIcon
  color: string
}

export interface IAppGraph {
  nodes: TServiceNode[]
  edges: Edge[]
}
