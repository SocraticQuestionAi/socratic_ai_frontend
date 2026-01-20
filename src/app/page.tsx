'use client'

import { AppShell } from '@/components/layout'
import { useUIStore } from '@/stores'
import { PDFWorkspaceView, SimilarityView, StudioView } from '@/features'

export default function HomePage() {
  const { viewMode } = useUIStore()

  return (
    <AppShell>
      {viewMode === 'pdf-workspace' && <PDFWorkspaceView />}
      {viewMode === 'similarity' && <SimilarityView />}
      {viewMode === 'studio' && <StudioView />}
    </AppShell>
  )
}
