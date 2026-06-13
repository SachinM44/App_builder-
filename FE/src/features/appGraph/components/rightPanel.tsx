import { memo } from 'react'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@/components/ui/sheet'
import { AppSelector } from '@/features/appGraph/components/appSelector'
import { NodeInspector } from '@/features/appGraph/components/nodeInspector'
import { useUiStore } from '@/store/uiStore'

export const RightPanel = memo(function RightPanel(): JSX.Element {
  const selectedNodeId = useUiStore((state) => state.selectedNodeId)
  const isMobilePanelOpen = useUiStore((state) => state.isMobilePanelOpen)
  const setMobilePanelOpen = useUiStore((state) => state.setMobilePanelOpen)

  return (
    <>
      {selectedNodeId && (
        <aside className="pointer-events-auto absolute bottom-4 right-4 top-24 z-10 hidden w-[360px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-black/40 duration-200 animate-in slide-in-from-right md:flex">
          <div className="flex-1 overflow-y-auto p-4">
            <NodeInspector />
          </div>
        </aside>
      )}

      <Sheet open={isMobilePanelOpen} onOpenChange={setMobilePanelOpen}>
        <SheetContent className="md:hidden" overlayClassName="md:hidden">
          <SheetTitle className="sr-only">Application panel</SheetTitle>
          <SheetDescription className="sr-only">
            Select an application and inspect the selected node.
          </SheetDescription>
          <div className="flex flex-1 flex-col gap-6 overflow-y-auto pt-2">
            <AppSelector onSelected={() => setMobilePanelOpen(false)} />
            <div className="border-t border-border pt-4">
              <NodeInspector />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
})
