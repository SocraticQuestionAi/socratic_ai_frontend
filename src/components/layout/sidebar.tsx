'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useUIStore } from '@/stores'
import {
  FileText,
  GitCompare,
  Sparkles,
  PanelLeftClose,
  PanelLeft,
  BookOpen,
} from 'lucide-react'
import type { ViewMode } from '@/types'

const navItems: { mode: ViewMode; label: string; icon: React.ReactNode; description: string }[] = [
  {
    mode: 'pdf-workspace',
    label: 'PDF Workspace',
    icon: <FileText className="h-5 w-5" />,
    description: 'Generate questions from PDFs',
  },
  {
    mode: 'similarity',
    label: 'Similar Questions',
    icon: <GitCompare className="h-5 w-5" />,
    description: 'Generate question variations',
  },
  {
    mode: 'studio',
    label: 'Interactive Studio',
    icon: <Sparkles className="h-5 w-5" />,
    description: 'Refine questions with AI',
  },
]

export function Sidebar() {
  const { viewMode, setViewMode, sidebarOpen, toggleSidebar } = useUIStore()

  return (
    <aside
      className={cn(
        'relative flex flex-col border-r bg-card transition-all duration-300',
        sidebarOpen ? 'w-64' : 'w-16'
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4">
        {sidebarOpen && (
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-semibold">Socratic AI</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={cn(!sidebarOpen && 'mx-auto')}
        >
          {sidebarOpen ? (
            <PanelLeftClose className="h-5 w-5" />
          ) : (
            <PanelLeft className="h-5 w-5" />
          )}
        </Button>
      </div>

      <Separator />

      {/* Navigation */}
      <ScrollArea className="flex-1 px-2 py-4">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Button
              key={item.mode}
              variant={viewMode === item.mode ? 'secondary' : 'ghost'}
              className={cn(
                'justify-start gap-3 h-auto py-3',
                !sidebarOpen && 'justify-center px-2'
              )}
              onClick={() => setViewMode(item.mode)}
            >
              {item.icon}
              {sidebarOpen && (
                <div className="flex flex-col items-start">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {item.description}
                  </span>
                </div>
              )}
            </Button>
          ))}
        </nav>
      </ScrollArea>

      {/* Footer */}
      {sidebarOpen && (
        <>
          <Separator />
          <div className="p-4">
            <p className="text-xs text-muted-foreground text-center">
              Powered by AI
            </p>
          </div>
        </>
      )}
    </aside>
  )
}
