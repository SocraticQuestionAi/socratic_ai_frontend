'use client'

import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import { toast } from 'sonner'
import type { SimilarGenerateRequest, SimilarGenerateResponse } from '@/types'

interface UseGenerateSimilarOptions {
  onSuccess?: (data: SimilarGenerateResponse) => void
}

export function useGenerateSimilar(options?: UseGenerateSimilarOptions) {
  const mutation = useMutation({
    mutationFn: async (data: SimilarGenerateRequest) => {
      return apiClient.generateSimilar(data)
    },
    onSuccess: (data) => {
      toast.success(`Generated ${data.similar_questions.length} similar questions!`)
      options?.onSuccess?.(data)
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to generate similar questions')
    },
  })

  return {
    generateSimilar: mutation.mutate,
    isLoading: mutation.isPending,
    data: mutation.data,
    reset: mutation.reset,
  }
}
