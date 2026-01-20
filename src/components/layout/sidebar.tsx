'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useUIStore } from '@/stores'
import { useTranslation } from '@/lib/i18n'
import {
  FileText,
  GitCompare,
  Sparkles,
  PanelLeftClose,
  PanelLeft,
  BookOpen,
  Zap,
} from 'lucide-react'
import type { ViewMode } from '@/types'

export function Sidebar() {
  const { viewMode, setViewMode, sidebarOpen, toggleSidebar } = useUIStore()
  const t = useTranslation()

  const navItems: { mode: ViewMode; label: string; icon: React.ReactNode; description: string; gradient: string }[] = [
    {
      mode: 'pdf-workspace',
      label: t.nav.pdfWorkspace,
      icon: <FileText className="h-5 w-5" />,
      description: t.nav.pdfWorkspaceDesc,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      mode: 'similarity',
      label: t.nav.similarQuestions,
      icon: <GitCompare className="h-5 w-5" />,
      description: t.nav.similarQuestionsDesc,
      gradient: 'from-violet-500 to-purple-500',
    },
    {
      mode: 'studio',
      label: t.nav.interactiveStudio,
      icon: <Sparkles className="h-5 w-5" />,
      description: t.nav.interactiveStudioDesc,
      gradient: 'from-orange-500 to-pink-500',
    },
  ]

  return (
    <motion.aside
      data-testid="sidebar"
      initial={false}
      animate={{ width: sidebarOpen ? 280 : 72 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "relative flex flex-col border-r border-border/50 bg-card/50 backdrop-blur-xl",
        sidebarOpen ? "w-64" : "w-16"
      )}
    >
      {/* Gradient accent line */}
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-violet-500/50 to-primary/50 opacity-50" />
      
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4">
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 rounded-xl blur-lg opacity-50" />
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
              </div>
              <div data-testid="sidebar-logo">
                <h1 className="font-bold text-lg gradient-text">Socratic AI</h1>
                <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Zap className="h-3 w-3 text-yellow-500" />
                  Powered by AI
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <Button
          data-testid="sidebar-toggle"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={cn(
            'h-9 w-9 rounded-lg hover:bg-primary/10 transition-all duration-200',
            !sidebarOpen && 'mx-auto'
          )}
        >
          <motion.div
            animate={{ rotate: sidebarOpen ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            {sidebarOpen ? (
              <PanelLeftClose className="h-5 w-5" />
            ) : (
              <PanelLeft className="h-5 w-5" />
            )}
          </motion.div>
        </Button>
      </div>

      <Separator className="opacity-50" />

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="flex flex-col gap-2">
          {navItems.map((item, index) => {
            const isActive = viewMode === item.mode
            
            return (
              <motion.div
                key={item.mode}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  data-testid={`nav-${item.mode}`}
                  data-active={isActive}
                  onClick={() => setViewMode(item.mode)}
                  className={cn(
                    'group relative w-full flex items-center gap-3 rounded-xl p-3 transition-all duration-300',
                    'hover:bg-primary/5',
                    isActive && 'bg-primary/10',
                    !sidebarOpen && 'justify-center px-3'
                  )}
                >
                  {/* Active indicator */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className={cn(
                          'absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full',
                          `bg-gradient-to-b ${item.gradient}`
                        )}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>
                  
                  {/* Icon with gradient background */}
                  <div
                    className={cn(
                      'relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-all duration-300',
                      isActive 
                        ? `bg-gradient-to-br ${item.gradient} text-white shadow-lg` 
                        : 'bg-muted/50 text-muted-foreground group-hover:bg-muted group-hover:text-foreground'
                    )}
                  >
                    {isActive && (
                      <motion.div
                        className={cn('absolute inset-0 rounded-lg bg-gradient-to-br', item.gradient)}
                        animate={{ 
                          boxShadow: ['0 0 20px rgba(59, 130, 246, 0.3)', '0 0 30px rgba(139, 92, 246, 0.4)', '0 0 20px rgba(59, 130, 246, 0.3)']
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    <span className="relative z-10">{item.icon}</span>
                  </div>
                  
                  {/* Text content */}
                  <AnimatePresence mode="wait">
                    {sidebarOpen && (
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col items-start overflow-hidden"
                      >
                        <span className={cn(
                          'font-medium text-sm whitespace-nowrap transition-colors duration-200',
                          isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                        )}>
                          {item.label}
                        </span>
                        <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                          {item.description}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <Separator className="opacity-50" />
            <div className="p-4">
              <div className="rounded-xl bg-gradient-to-r from-primary/10 via-violet-500/10 to-primary/10 p-4 border border-primary/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-medium text-foreground">AI Ready</span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  {t.common.poweredByAI}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  )
}
