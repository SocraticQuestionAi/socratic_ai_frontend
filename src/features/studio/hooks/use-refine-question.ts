'use client'

import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import { useStudioStore, useQuestionStore } from '@/stores'
import { toast } from 'sonner'
import type { Question, Message } from '@/types'
import { generateId } from '@/lib/utils'

export function useRefineQuestion() {
  const {
    question,
    conversationId,
    addMessage,
    updateQuestion,
    setConversationId,
    incrementTurn,
    setRefining,
  } = useStudioStore()

  const { updateQuestion: updateQuestionInStore } = useQuestionStore()

  const mutation = useMutation({
    mutationFn: async (instruction: string) => {
      if (!question) throw new Error('No question selected')

      // Add user message
      const userMessage: Message = {
        id: generateId(),
        role: 'user',
        content: instruction,
        timestamp: new Date(),
      }
      addMessage(userMessage)
      setRefining(true)

      const response = await apiClient.refineQuestion({
        question_state: question,
        instruction,
        conversation_id: conversationId,
      })

      return response
    },
    onSuccess: (data) => {
      // Add assistant message
      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: data.changes_made,
        timestamp: new Date(),
      }
      addMessage(assistantMessage)

      // Update question in studio store
      updateQuestion(data.refined_question)

      // Update question in main store too
      if (question) {
        updateQuestionInStore(question.id, data.refined_question)
      }

      // Update conversation tracking
      if (!conversationId) {
        setConversationId(data.conversation_id)
      }
      incrementTurn()

      toast.success('Question refined successfully!')
      setRefining(false)
    },
    onError: (error: Error) => {
      // Add error message
      const errorMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: `Sorry, I couldn't refine the question: ${error.message}`,
        timestamp: new Date(),
      }
      addMessage(errorMessage)

      toast.error(error.message || 'Failed to refine question')
      setRefining(false)
    },
  })

  return {
    refineQuestion: mutation.mutate,
    isLoading: mutation.isPending,
  }
}
