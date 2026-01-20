'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useQuestionStore } from '@/stores'
import { Plus, ChevronRight } from 'lucide-react'
import type { Question } from '@/types'

interface QuestionSelectorProps {
  onSelectQuestion: (question: Question) => void
  currentQuestionId?: string
}

export function QuestionSelector({
  onSelectQuestion,
  currentQuestionId,
}: QuestionSelectorProps) {
  const { questions, sessions } = useQuestionStore()

  // Combine questions from current session and history
  const allQuestions = questions.length > 0 ? questions : sessions.flatMap((s) => s.questions)

  if (allQuestions.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p className="text-sm">No questions available.</p>
        <p className="text-xs mt-1">Generate some questions in the PDF Workspace first.</p>
      </div>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full gap-2">
          <Plus className="h-4 w-4" />
          Select a Question to Refine
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Select a Question</DialogTitle>
          <DialogDescription>
            Choose a question from your generated questions to refine using AI.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-2">
            {allQuestions.map((question) => (
              <button
                key={question.id}
                onClick={() => onSelectQuestion(question)}
                className={cn(
                  'w-full text-left p-4 rounded-lg border transition-colors hover:bg-muted/50',
                  currentQuestionId === question.id && 'border-primary bg-primary/5'
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {question.question_type === 'mcq' ? 'MCQ' : 'Open Ended'}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {question.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm line-clamp-2">{question.question_text}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
