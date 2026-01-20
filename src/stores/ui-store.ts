import { create } from 'zustand'
import type { ViewMode } from '@/types'

interface UIState {
  // Current view/mode
  viewMode: ViewMode

  // Sidebar state
  sidebarOpen: boolean

  // Panel sizes for resizable panels
  panelSizes: {
    chat: number
    preview: number
  }

  // Actions
  setViewMode: (mode: ViewMode) => void
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  setPanelSizes: (sizes: { chat: number; preview: number }) => void
}

export const useUIStore = create<UIState>((set) => ({
  viewMode: 'pdf-workspace',
  sidebarOpen: true,
  panelSizes: {
    chat: 40,
    preview: 60,
  },

  setViewMode: (mode) => {
    set({ viewMode: mode })
  },

  toggleSidebar: () => {
    set((state) => ({ sidebarOpen: !state.sidebarOpen }))
  },

  setSidebarOpen: (open) => {
    set({ sidebarOpen: open })
  },

  setPanelSizes: (sizes) => {
    set({ panelSizes: sizes })
  },
}))
