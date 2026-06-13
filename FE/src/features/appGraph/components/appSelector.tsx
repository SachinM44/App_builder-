import { ChevronRight, Plus, Search } from 'lucide-react'
import { memo, useMemo, useState } from 'react'

import { useApps } from '@/api/queries'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scrollArea'
import { Skeleton } from '@/components/ui/skeleton'
import { AppGlyph } from '@/features/appGraph/components/brandIcon'
import { cn } from '@/lib/utils'
import { useUiStore } from '@/store/uiStore'

interface IAppSelectorProps {
  onSelected?: () => void
}

export const AppSelector = memo(function AppSelector({
  onSelected,
}: IAppSelectorProps): JSX.Element {
  const { data: apps, isLoading, isError } = useApps()
  const selectedAppId = useUiStore((state) => state.selectedAppId)
  const setSelectedAppId = useUiStore((state) => state.setSelectedAppId)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!apps) return []
    const normalized = query.trim().toLowerCase()
    if (!normalized) return apps
    return apps.filter((app) => app.name.toLowerCase().includes(normalized))
  }, [apps, query])

  return (
    <div className="flex flex-col gap-3">
      <h2 className="px-1 text-base font-semibold text-foreground">
        Application
      </h2>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search..."
            className="h-10 pl-9"
          />
        </div>
        <Button size="icon" className="h-10 w-10 shrink-0" aria-label="Add application">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="h-[260px] pr-2">
        <div className="flex flex-col gap-1">
          {isLoading &&
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3 px-2 py-2">
                <Skeleton className="h-9 w-9 rounded-lg" />
                <Skeleton className="h-4 w-40" />
              </div>
            ))}

          {isError && (
            <p className="px-2 py-6 text-center text-sm text-muted-foreground">
              Failed to load applications.
            </p>
          )}

          {!isLoading &&
            !isError &&
            filtered.map((app) => {
              const isSelected = app.id === selectedAppId
              return (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => {
                    setSelectedAppId(app.id)
                    onSelected?.()
                  }}
                  className={cn(
                    'group flex items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-accent',
                    isSelected && 'bg-accent'
                  )}
                >
                  <AppGlyph icon={app.icon} color={app.color} />
                  <span className="flex-1 truncate text-sm font-medium text-foreground">
                    {app.name}
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </button>
              )
            })}

          {!isLoading && !isError && filtered.length === 0 && (
            <p className="px-2 py-6 text-center text-sm text-muted-foreground">
              No applications found.
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  )
})
