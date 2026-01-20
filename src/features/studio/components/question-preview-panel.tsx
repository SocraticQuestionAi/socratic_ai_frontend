'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SelectQuestionState } from '@/components/shared/empty-state'
import { cn } from '@/lib/utils'
import { CheckCircle2, Circle, Sparkles } from 'lucide-react'
import type { Question } from '@/types'

interface QuestionPreviewPanelProps {
  question: Question | null
  changesDescription?: string
  turnNumber?: number
}

const difficultyColors = {
  easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  mixed: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
}

export function QuestionPreviewPanel({
  question,
  changesDescription,
  turnNumber = 0,
}: QuestionPreviewPanelProps) {
  if (!question) {
    return (
      <div className="flex items-center justify-center h-full">
        <SelectQuestionState />
      </div>
    )
  }

  const confidencePercent = Math.round(question.confidence_score * 100)

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Question Preview</h2>
            {turnNumber > 0 && (
              <Badge variant="outline" className="gap-1">
                <Sparkles className="h-3 w-3" />
                Refinement #{turnNumber}
              </Badge>
            )}
          </div>

          {/* Metadata Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">
              {question.question_type === 'mcq' ? 'Multiple Choice' : 'Open Ended'}
            </Badge>
            <Badge
              className={cn('text-xs', difficultyColors[question.difficulty])}
              variant="secondary"
            >
              {question.difficulty}
            </Badge>
            {question.topic && (
              <Badge variant="secondary">{question.topic}</Badge>
            )}
          </div>
        </div>

        <Separator />

        {/* Question Text */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Question</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed">{question.question_text}</p>
          </CardContent>
        </Card>

        {/* Answer Options for MCQ */}
        {question.question_type === 'mcq' && question.options && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Answer Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {question.options.map((option) => (
                <div
                  key={option.label}
                  className={cn(
                    'flex items-center gap-3 rounded-lg border p-3 transition-colors',
                    option.is_correct
                      ? 'border-green-500 bg-green-50 dark:bg-green-950/50'
                      : 'hover:bg-muted/50'
                  )}
                >
                  {option.is_correct ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
                  )}
                  <span className="font-semibold text-muted-foreground">
                    {option.label}.
                  </span>
                  <span className="flex-1">{option.text}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Correct Answer for Open Ended */}
        {question.question_type === 'open_ended' && question.correct_answer && (
          <Card className="border-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-green-700 dark:text-green-300">
                Expected Answer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{question.correct_answer}</p>
            </CardContent>
          </Card>
        )}

        {/* Explanation */}
        {question.explanation && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Explanation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{question.explanation}</p>
            </CardContent>
          </Card>
        )}

        {/* Changes Description */}
        {changesDescription && (
          <Card className="border-primary/50 bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-primary flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Recent Changes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{changesDescription}</p>
            </CardContent>
          </Card>
        )}

        {/* Confidence Score */}
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">AI Confidence</span>
              <span className="text-sm font-medium">{confidencePercent}%</span>
            </div>
            <Progress value={confidencePercent} className="h-2" />
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  )
}
