// Re-export all API types
export * from './api'

// =============================================================================
// Frontend-specific Types
// =============================================================================

// -----------------------------------------------------------------------------
// UI State Types
// -----------------------------------------------------------------------------

export type ViewMode = 'pdf-workspace' | 'similarity' | 'studio'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface ConversationTurn {
  id: string
  messages: Message[]
  questionSnapshot?: import('./api').Question
}

// -----------------------------------------------------------------------------
// PDF Workspace Types
// -----------------------------------------------------------------------------

export interface PDFFile {
  id: string
  file: File
  name: string
  size: number
  uploadedAt: Date
  pageCount?: number
}

export interface GenerationSession {
  id: string
  sourceType: 'text' | 'pdf'
  sourceName?: string
  questions: import('./api').Question[]
  generatedAt: Date
  summary?: string
}

// -----------------------------------------------------------------------------
// Studio Session Types
// -----------------------------------------------------------------------------

export interface StudioSession {
  id: string
  conversationId: string | null
  question: import('./api').Question
  history: ConversationTurn[]
  createdAt: Date
  updatedAt: Date
}

// -----------------------------------------------------------------------------
// Component Props Types
// -----------------------------------------------------------------------------

export interface QuestionCardProps {
  question: import('./api').Question
  onEdit?: () => void
  onRefine?: () => void
  onDelete?: () => void
  isSelected?: boolean
  showConfidence?: boolean
}
