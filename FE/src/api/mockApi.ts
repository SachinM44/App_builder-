import { APPS, ERROR_APP_ID, GRAPHS } from '@/api/mockData'
import type { IApp, IAppGraph } from '@/api/types'

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchApps(): Promise<IApp[]> {
  await delay(600)
  return structuredClone(APPS)
}

export async function fetchAppGraph(appId: string): Promise<IAppGraph> {
  await delay(700)
  if (appId === ERROR_APP_ID) {
    throw new Error('Failed to load the graph for this application.')
  }
  const graph = GRAPHS[appId]
  if (!graph) {
    throw new Error('Application not found.')
  }
  return structuredClone(graph)
}
