import { create } from 'zustand'

export type TInspectorTab = 'config' | 'runtime'

interface IUiState {
  selectedAppId: string | null
  selectedNodeId: string | null
  isMobilePanelOpen: boolean
  activeInspectorTab: TInspectorTab
  setSelectedAppId: (appId: string) => void
  setSelectedNodeId: (nodeId: string | null) => void
  setMobilePanelOpen: (open: boolean) => void
  toggleMobilePanel: () => void
  setActiveInspectorTab: (tab: TInspectorTab) => void
}

export const useUiStore = create<IUiState>((set) => ({
  selectedAppId: 'supertokens-golang',
  selectedNodeId: null,
  isMobilePanelOpen: false,
  activeInspectorTab: 'config',
  setSelectedAppId: (appId) => set({ selectedAppId: appId, selectedNodeId: null }),
  setSelectedNodeId: (nodeId) => set({ selectedNodeId: nodeId }),
  setMobilePanelOpen: (open) => set({ isMobilePanelOpen: open }),
  toggleMobilePanel: () =>
    set((state) => ({ isMobilePanelOpen: !state.isMobilePanelOpen })),
  setActiveInspectorTab: (tab) => set({ activeInspectorTab: tab }),
}))
