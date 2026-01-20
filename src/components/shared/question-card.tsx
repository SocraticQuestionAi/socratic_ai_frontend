'use client'

import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Progress } from '@/components/ui/progress'
import type { Question } from '@/types'
import {
  MoreVertical,
  Edit,
  Sparkles,
  Trash2,
  CheckCircle2,
  Circle,
} from 'lucide-react'

interface QuestionCardProps {
  question: Question
  onEdit?: () => void
  onRefine?: () => void
  onDelete?: () => void
  isSelected?: boolean
  showConfidence?: boolean
  className?: string
}

const difficultyColors = {
  easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  mixed: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
}

export function QuestionCard({
  question,
  onEdit,
  onRefine,
  onDelete,
  isSelected = false,
  showConfidence = true,
  className,
}: QuestionCardProps) {
  const confidencePercent = Math.round(question.confidence_score * 100)

  return (
    <Card
      className={cn(
        'transition-all duration-200 hover:shadow-md',
        isSelected && 'ring-2 ring-primary',
        className
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">
              {question.question_type === 'mcq' ? 'MCQ' : 'Open Ended'}
            </Badge>
            <Badge
              className={cn('text-xs', difficultyColors[question.difficulty])}
              variant="secondary"
            >
              {question.difficulty}
            </Badge>
            {question.topic && (
              <Badge variant="secondary" className="text-xs">
                {question.topic}
              </Badge>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onEdit && (
                <DropdownMenuItem onClick={onEdit}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
              )}
              {onRefine && (
                <DropdownMenuItem onClick={onRefine}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Refine with AI
                </DropdownMenuItem>
              )}
              {onDelete && (
                <DropdownMenuItem onClick={onDelete} className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Question Text */}
        <p className="text-sm font-medium leading-relaxed">
          {question.question_text}
        </p>

        {/* Options for MCQ */}
        {question.question_type === 'mcq' && question.options && (
          <div className="space-y-2">
            {question.options.map((option) => (
              <div
                key={option.label}
                className={cn(
                  'flex items-center gap-2 rounded-md border p-2 text-sm',
                  option.is_correct && 'border-green-500 bg-green-50 dark:bg-green-950'
                )}
              >
                {option.is_correct ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                ) : (
                  <Circle className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="font-medium">{option.label}.</span>
                <span>{option.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Correct Answer for Open Ended */}
        {question.question_type === 'open_ended' && question.correct_answer && (
          <div className="rounded-md border border-green-500 bg-green-50 p-3 dark:bg-green-950">
            <p className="text-xs font-medium text-green-700 dark:text-green-300 mb-1">
              Expected Answer
            </p>
            <p className="text-sm">{question.correct_answer}</p>
          </div>
        )}

        {/* Explanation */}
        {question.explanation && (
          <div className="rounded-md bg-muted p-3">
            <p className="text-xs font-medium text-muted-foreground mb-1">
              Explanation
            </p>
            <p className="text-sm text-muted-foreground">{question.explanation}</p>
          </div>
        )}

        {/* Confidence Score */}
        {showConfidence && (
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Confidence</span>
            <Progress value={confidencePercent} className="flex-1 h-2" />
            <span className="text-xs font-medium">{confidencePercent}%</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
