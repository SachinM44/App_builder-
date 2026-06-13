import {
  ChevronDown,
  ChevronUp,
  Moon,
  MoreHorizontal,
  PanelRight,
  Share2,
  Sun,
} from 'lucide-react'
import { memo, useState, type ReactNode } from 'react'

import { useApps } from '@/api/queries'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { AppSelector } from '@/features/appGraph/components/appSelector'
import { AppGlyph } from '@/features/appGraph/components/brandIcon'
import { cn } from '@/lib/utils'
import { useUiStore } from '@/store/uiStore'

function BrandMark(): JSX.Element {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M4 18 L12 4 L14.5 9 L9 18 Z" fill="#0a0a0b" />
        <path d="M13.5 18 L18 9 L20 18 Z" fill="#0a0a0b" />
      </svg>
    </div>
  )
}

export const TopBar = memo(function TopBar(): JSX.Element {
  const { data: apps } = useApps()
  const selectedAppId = useUiStore((state) => state.selectedAppId)
  const toggleMobilePanel = useUiStore((state) => state.toggleMobilePanel)
  const [open, setOpen] = useState(true)

  const selectedApp = apps?.find((app) => app.id === selectedAppId)

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between p-4">
      <div className="pointer-events-auto flex items-center gap-1.5 rounded-xl border border-border bg-card p-1.5 shadow-lg shadow-black/30">
        <BrandMark />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-accent"
            >
              {selectedApp ? (
                <AppGlyph
                  icon={selectedApp.icon}
                  color={selectedApp.color}
                  className="h-7 w-7 rounded-md"
                />
              ) : (
                <span className="h-7 w-7 rounded-md bg-muted" />
              )}
              <span className="max-w-[180px] truncate text-sm font-medium text-foreground">
                {selectedApp?.name ?? 'Select application'}
              </span>
              {open ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            sideOffset={12}
            className="w-[340px] p-4"
          >
            <AppSelector onSelected={() => setOpen(false)} />
          </PopoverContent>
        </Popover>
        <button
          type="button"
          aria-label="More actions"
          className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <div className="pointer-events-auto flex items-center gap-1 rounded-xl border border-border bg-card p-1.5 shadow-lg shadow-black/30">
        <button
          type="button"
          aria-label="Toggle panel"
          onClick={toggleMobilePanel}
          className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:hidden"
        >
          <PanelRight className="h-4 w-4" />
        </button>
        <ActionButton ariaLabel="Share">
          <Share2 className="h-4 w-4" />
        </ActionButton>
        <ActionButton ariaLabel="Dark theme" active>
          <Moon className="h-4 w-4" />
        </ActionButton>
        <ActionButton ariaLabel="Light theme">
          <Sun className="h-4 w-4" />
        </ActionButton>
        <span className="ml-1 h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500" />
      </div>
    </header>
  )
})

interface IActionButtonProps {
  children: ReactNode
  ariaLabel: string
  active?: boolean
}

function ActionButton({
  children,
  ariaLabel,
  active,
}: IActionButtonProps): JSX.Element {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground',
        active && 'bg-accent text-foreground'
      )}
    >
      {children}
    </button>
  )
}
