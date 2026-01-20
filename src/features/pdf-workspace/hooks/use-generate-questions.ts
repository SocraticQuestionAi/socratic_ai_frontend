'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import { useQuestionStore } from '@/stores'
import { toast } from 'sonner'
import type { QuestionType, Difficulty, GenerationSession } from '@/types'

interface UseGenerateQuestionsOptions {
  onSuccess?: () => void
}

export function useGenerateQuestions(options?: UseGenerateQuestionsOptions) {
  const { addSession } = useQuestionStore()
  const [progress, setProgress] = useState(0)

  const generateFromPDF = useMutation({
    mutationFn: async ({
      file,
      numQuestions,
      questionTypes,
      difficulty,
      topicFocus,
    }: {
      file: File
      numQuestions: number
      questionTypes: QuestionType[]
      difficulty: Difficulty
      topicFocus?: string
    }) => {
      setProgress(10)
      const response = await apiClient.generateFromPDF(file, {
        num_questions: numQuestions,
        question_types: questionTypes,
        difficulty,
        topic_focus: topicFocus || undefined,
      })
      setProgress(100)
      return response
    },
    onSuccess: (data) => {
      const session: GenerationSession = {
        id: data.session_id,
        sourceType: 'pdf',
        sourceName: 'Uploaded PDF',
        questions: data.questions,
        generatedAt: new Date(),
        summary: data.generation_summary,
      }
      addSession(session)
      toast.success(`Generated ${data.questions.length} questions!`)
      options?.onSuccess?.()
      setProgress(0)
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to generate questions')
      setProgress(0)
    },
  })

  const generateFromText = useMutation({
    mutationFn: async ({
      content,
      numQuestions,
      questionTypes,
      difficulty,
      topicFocus,
    }: {
      content: string
      numQuestions: number
      questionTypes: QuestionType[]
      difficulty: Difficulty
      topicFocus?: string
    }) => {
      setProgress(10)
      const response = await apiClient.generateFromText({
        content,
        num_questions: numQuestions,
        question_types: questionTypes,
        difficulty,
        topic_focus: topicFocus || undefined,
      })
      setProgress(100)
      return response
    },
    onSuccess: (data) => {
      const session: GenerationSession = {
        id: data.session_id,
        sourceType: 'text',
        sourceName: 'Text Input',
        questions: data.questions,
        generatedAt: new Date(),
        summary: data.generation_summary,
      }
      addSession(session)
      toast.success(`Generated ${data.questions.length} questions!`)
      options?.onSuccess?.()
      setProgress(0)
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to generate questions')
      setProgress(0)
    },
  })

  return {
    generateFromPDF,
    generateFromText,
    isLoading: generateFromPDF.isPending || generateFromText.isPending,
    progress,
  }
}
