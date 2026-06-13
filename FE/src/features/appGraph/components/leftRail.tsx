import { Box, LayoutGrid, Workflow } from 'lucide-react'
import { memo, type ReactNode } from 'react'
import { SiGithub, SiMongodb, SiPostgresql, SiRedis } from 'react-icons/si'

const railItems: { key: string; icon: ReactNode }[] = [
  { key: 'github', icon: <SiGithub size={20} color="#e6e6e6" /> },
  { key: 'postgres', icon: <SiPostgresql size={20} color="#4f9bd9" /> },
  { key: 'redis', icon: <SiRedis size={20} color="#ff4438" /> },
  { key: 'mongodb', icon: <SiMongodb size={20} color="#4faa41" /> },
  { key: 'box', icon: <Box size={20} className="text-violet-400" /> },
  { key: 'grid', icon: <LayoutGrid size={20} className="text-amber-500" /> },
  { key: 'workflow', icon: <Workflow size={20} className="text-teal-400" /> },
]

export const LeftRail = memo(function LeftRail(): JSX.Element {
  return (
    <nav className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-1 rounded-2xl border border-border bg-card p-2 shadow-lg shadow-black/30 sm:flex">
      {railItems.map((item) => (
        <button
          key={item.key}
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-accent"
        >
          {item.icon}
        </button>
      ))}
    </nav>
  )
})
