'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { LanguageToggle } from '@/components/ui/language-toggle'
import { useUIStore } from '@/stores'
import { useTranslation } from '@/lib/i18n'
import { Menu, Settings, HelpCircle, Sparkles } from 'lucide-react'

export function Header() {
  const { viewMode, toggleSidebar, sidebarOpen } = useUIStore()
  const t = useTranslation()

  const viewTitles = {
    'pdf-workspace': t.nav.pdfWorkspace,
    'similarity': t.nav.similarQuestions,
    'studio': t.nav.interactiveStudio,
  }

  const viewIcons = {
    'pdf-workspace': '📄',
    'similarity': '🔄',
    'studio': '✨',
  }

  return (
    <header data-testid="header" className="flex h-16 items-center justify-between border-b border-border/50 bg-card/30 backdrop-blur-xl px-4">
      <div className="flex items-center gap-4">
        {!sidebarOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              data-testid="header-menu-button"
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="hover:bg-primary/10"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
        
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3"
        >
          <span className="text-2xl">{viewIcons[viewMode]}</span>
          <div>
            <h1 data-testid="view-title" className="text-lg font-semibold">{viewTitles[viewMode]}</h1>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3 text-primary" />
              <span>AI-Powered</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="flex items-center gap-1"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <LanguageToggle />
        <ThemeToggle />
        
        <div className="w-px h-6 bg-border/50 mx-2" />
        
        <Button
          data-testid="help-button"
          variant="ghost"
          size="icon"
          className="hover:bg-primary/10 transition-colors"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
        <Button
          data-testid="settings-button"
          variant="ghost"
          size="icon"
          className="hover:bg-primary/10 transition-colors"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </motion.div>
    </header>
  )
}
