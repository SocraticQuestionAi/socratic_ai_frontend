import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { FileQuestion, Upload, Sparkles } from 'lucide-react'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center',
        className
      )}
    >
      {icon && (
        <div className="mb-4 rounded-full bg-muted p-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm">{description}</p>
      {action && (
        <Button onClick={action.onClick} className="mt-4">
          {action.label}
        </Button>
      )}
    </div>
  )
}

export function NoQuestionsState({ onGenerate }: { onGenerate?: () => void }) {
  return (
    <EmptyState
      icon={<FileQuestion className="h-8 w-8 text-muted-foreground" />}
      title="No questions yet"
      description="Upload a PDF or enter text to generate educational questions using AI."
      action={onGenerate ? { label: 'Generate Questions', onClick: onGenerate } : undefined}
    />
  )
}

export function UploadPDFState({ onUpload }: { onUpload: () => void }) {
  return (
    <EmptyState
      icon={<Upload className="h-8 w-8 text-muted-foreground" />}
      title="Upload a PDF"
      description="Drag and drop a PDF file or click to browse. We'll extract the content and generate questions."
      action={{ label: 'Upload PDF', onClick: onUpload }}
    />
  )
}

export function SelectQuestionState() {
  return (
    <EmptyState
      icon={<Sparkles className="h-8 w-8 text-muted-foreground" />}
      title="Select a question"
      description="Choose a question from the list to view details or refine it using the Interactive Studio."
    />
  )
}
