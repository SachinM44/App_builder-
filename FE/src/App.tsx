import { GraphCanvas } from '@/features/appGraph/components/graphCanvas'
import { LeftRail } from '@/features/appGraph/components/leftRail'
import { RightPanel } from '@/features/appGraph/components/rightPanel'
import { TopBar } from '@/features/appGraph/components/topBar'

export function App(): JSX.Element {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      <GraphCanvas />
      <LeftRail />
      <TopBar />
      <RightPanel />
    </div>
  )
}
