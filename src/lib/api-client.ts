import type {
  GenerateFromTextRequest,
  GenerateResponse,
  SimilarGenerateRequest,
  SimilarGenerateResponse,
  RefineRequest,
  RefineResponse,
  APIError,
} from '@/types/api'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

class APIClient {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error: APIError = await response.json().catch(() => ({
        detail: 'An unexpected error occurred',
        status_code: response.status,
      }))
      throw new Error(error.detail)
    }

    return response.json()
  }

  // -------------------------------------------------------------------------
  // Generate Questions
  // -------------------------------------------------------------------------

  async generateFromText(data: GenerateFromTextRequest): Promise<GenerateResponse> {
    return this.request<GenerateResponse>('/generate/from-text', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async generateFromPDF(
    file: File,
    options: {
      num_questions?: number
      question_types?: ('mcq' | 'open_ended')[]
      difficulty?: 'easy' | 'medium' | 'hard' | 'mixed'
      topic_focus?: string
    } = {}
  ): Promise<GenerateResponse> {
    const formData = new FormData()
    formData.append('file', file)

    if (options.num_questions) {
      formData.append('num_questions', options.num_questions.toString())
    }
    if (options.question_types && options.question_types.length > 0) {
      formData.append('question_types', options.question_types.join(','))
    }
    if (options.difficulty) {
      formData.append('difficulty', options.difficulty)
    }
    if (options.topic_focus) {
      formData.append('topic_focus', options.topic_focus)
    }

    const response = await fetch(`${this.baseUrl}/generate/from-pdf`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const error: APIError = await response.json().catch(() => ({
        detail: 'Failed to process PDF',
        status_code: response.status,
      }))
      throw new Error(error.detail)
    }

    return response.json()
  }

  // -------------------------------------------------------------------------
  // Similar Questions
  // -------------------------------------------------------------------------

  async generateSimilar(data: SimilarGenerateRequest): Promise<SimilarGenerateResponse> {
    return this.request<SimilarGenerateResponse>('/similar/generate', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // -------------------------------------------------------------------------
  // Refine Question (Interactive Studio)
  // -------------------------------------------------------------------------

  async refineQuestion(data: RefineRequest): Promise<RefineResponse> {
    return this.request<RefineResponse>('/refine/refine', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
}

// Singleton instance
export const apiClient = new APIClient()

// Export class for testing
export { APIClient }
