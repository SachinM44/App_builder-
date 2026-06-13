import { useQuery, type UseQueryResult } from '@tanstack/react-query'

import { fetchAppGraph, fetchApps } from '@/api/mockApi'
import type { IApp, IAppGraph } from '@/api/types'

const FIVE_MINUTES = 5 * 60 * 1000

export function useApps(): UseQueryResult<IApp[]> {
  return useQuery({
    queryKey: ['apps'],
    queryFn: fetchApps,
    staleTime: FIVE_MINUTES,
  })
}

export function useAppGraph(
  appId: string | null
): UseQueryResult<IAppGraph> {
  return useQuery({
    queryKey: ['graph', appId],
    queryFn: () => fetchAppGraph(appId as string),
    enabled: Boolean(appId),
    retry: 1,
    staleTime: FIVE_MINUTES,
  })
}
