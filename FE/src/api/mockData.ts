import type {
  IApp,
  IAppGraph,
  IServiceNodeData,
  TNodeStatus,
  TServiceBrand,
} from '@/api/types'

export const APPS: IApp[] = [
  { id: 'supertokens-golang', name: 'supertokens-golang', icon: 'lightbulb', color: '#6366f1' },
  { id: 'supertokens-java', name: 'supertokens-java', icon: 'cog', color: '#7c6cf0' },
  { id: 'supertokens-python', name: 'supertokens-python', icon: 'rocket', color: '#ef5a3c' },
  { id: 'supertokens-ruby', name: 'supertokens-ruby', icon: 'image', color: '#ec4899' },
  { id: 'supertokens-go', name: 'supertokens-go', icon: 'database', color: '#6366f1' },
]

export const ERROR_APP_ID = 'supertokens-ruby'

interface INodeSeed {
  brand: TServiceBrand
  name: string
  status: TNodeStatus
  position: { x: number; y: number }
  load: number
}

function nodeData(seed: INodeSeed): IServiceNodeData {
  return {
    name: seed.name,
    brand: seed.brand,
    status: seed.status,
    pricePerHour: 0.03,
    region: 1,
    metrics: { cpu: 0.02, memory: 0.05, disk: 10 },
    load: seed.load,
    description: '',
  }
}

function buildGraph(seeds: INodeSeed[]): IAppGraph {
  const nodes = seeds.map((seed, index) => ({
    id: `${seed.brand}-${index}`,
    type: 'service' as const,
    position: seed.position,
    data: nodeData(seed),
  }))
  const edges = [
    {
      id: `${nodes[0].id}-${nodes[1].id}`,
      source: nodes[0].id,
      target: nodes[1].id,
    },
    {
      id: `${nodes[0].id}-${nodes[2].id}`,
      source: nodes[0].id,
      target: nodes[2].id,
    },
  ]
  return { nodes, edges }
}

export const GRAPHS: Record<string, IAppGraph> = {
  'supertokens-golang': buildGraph([
    { brand: 'postgres', name: 'Postgres', status: 'success', position: { x: 440, y: 0 }, load: 88 },
    { brand: 'redis', name: 'Redis', status: 'error', position: { x: 40, y: 300 }, load: 92 },
    { brand: 'mongodb', name: 'Mongodb', status: 'error', position: { x: 540, y: 340 }, load: 90 },
  ]),
  'supertokens-java': buildGraph([
    { brand: 'postgres', name: 'Postgres', status: 'success', position: { x: 440, y: 0 }, load: 64 },
    { brand: 'redis', name: 'Redis', status: 'success', position: { x: 40, y: 300 }, load: 71 },
    { brand: 'mongodb', name: 'Mongodb', status: 'degraded', position: { x: 540, y: 340 }, load: 80 },
  ]),
  'supertokens-python': buildGraph([
    { brand: 'postgres', name: 'Postgres', status: 'degraded', position: { x: 440, y: 0 }, load: 55 },
    { brand: 'redis', name: 'Redis', status: 'success', position: { x: 40, y: 300 }, load: 48 },
    { brand: 'mongodb', name: 'Mongodb', status: 'success', position: { x: 540, y: 340 }, load: 60 },
  ]),
  'supertokens-go': buildGraph([
    { brand: 'postgres', name: 'Postgres', status: 'success', position: { x: 440, y: 0 }, load: 76 },
    { brand: 'redis', name: 'Redis', status: 'degraded', position: { x: 40, y: 300 }, load: 83 },
    { brand: 'mongodb', name: 'Mongodb', status: 'success', position: { x: 540, y: 340 }, load: 69 },
  ]),
}
