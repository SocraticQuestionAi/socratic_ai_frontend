'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { QuestionCard } from '@/components/shared/question-card'
import { NoQuestionsState } from '@/components/shared/empty-state'
import { LoadingCard } from '@/components/shared/loading-spinner'
import type { Question } from '@/types'

interface QuestionsListProps {
  questions: Question[]
  isLoading?: boolean
  selectedQuestionId?: string | null
  onSelectQuestion?: (question: Question) => void
  onEditQuestion?: (question: Question) => void
  onRefineQuestion?: (question: Question) => void
  onDeleteQuestion?: (questionId: string) => void
}

export function QuestionsList({
  questions,
  isLoading = false,
  selectedQuestionId,
  onSelectQuestion,
  onEditQuestion,
  onRefineQuestion,
  onDeleteQuestion,
}: QuestionsListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        {[1, 2, 3].map((i) => (
          <LoadingCard key={i} />
        ))}
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <NoQuestionsState />
      </div>
    )
  }

  return (
    <ScrollArea className="h-full">
      <div className="space-y-4 p-4">
        {questions.map((question) => (
          <div
            key={question.id}
            onClick={() => onSelectQuestion?.(question)}
            className="cursor-pointer"
          >
            <QuestionCard
              question={question}
              isSelected={selectedQuestionId === question.id}
              onEdit={() => onEditQuestion?.(question)}
              onRefine={() => onRefineQuestion?.(question)}
              onDelete={() => onDeleteQuestion?.(question.id)}
              showConfidence
            />
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
