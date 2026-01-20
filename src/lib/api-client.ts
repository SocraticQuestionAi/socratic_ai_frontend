import type {
  GenerateFromTextRequest,
  GenerateResponse,
  SimilarGenerateRequest,
  SimilarGenerateResponse,
  RefineRequest,
  RefineResponse,
  APIError,
  ValidationErrorItem,
} from '@/types/api'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

// -----------------------------------------------------------------------------
// Field name mapping for user-friendly error messages
// -----------------------------------------------------------------------------

const FIELD_LABELS: Record<string, string> = {
  question_text: 'Question text',
  content: 'Content',
  num_questions: 'Number of questions',
  question_types: 'Question types',
  difficulty: 'Difficulty',
  topic_focus: 'Topic focus',
  instruction: 'Instruction',
  file: 'File',
  options: 'Options',
  num_similar: 'Number of similar questions',
}

// -----------------------------------------------------------------------------
// Error Parsing Utilities
// -----------------------------------------------------------------------------

/**
 * Parses validation errors from FastAPI into a user-friendly message
 */
function parseValidationErrors(errors: ValidationErrorItem[]): string {
  if (!errors || errors.length === 0) {
    return 'Validation failed'
  }

  const messages = errors.map((err) => {
    // Get the field name (last item in loc, excluding 'body')
    const fieldPath = err.loc.filter((l) => l !== 'body')
    const fieldName = fieldPath.length > 0 ? String(fieldPath[fieldPath.length - 1]) : 'field'
    const fieldLabel = FIELD_LABELS[fieldName] || fieldName.replace(/_/g, ' ')

    // Format the message based on error type
    switch (err.type) {
      case 'string_too_short':
        return `${fieldLabel} must be at least ${err.ctx?.min_length} characters`
      case 'string_too_long':
        return `${fieldLabel} must be at most ${err.ctx?.max_length} characters`
      case 'value_error':
      case 'missing':
        return `${fieldLabel} is required`
      case 'int_parsing':
      case 'int_type':
        return `${fieldLabel} must be a number`
      case 'greater_than_equal':
        return `${fieldLabel} must be at least ${err.ctx?.ge}`
      case 'less_than_equal':
        return `${fieldLabel} must be at most ${err.ctx?.le}`
      case 'enum':
        return `${fieldLabel} must be one of: ${(err.ctx?.expected as string[])?.join(', ')}`
      default:
        return `${fieldLabel}: ${err.msg}`
    }
  })

  return messages.join('. ')
}

/**
 * Parses API error response into a user-friendly message
 */
function parseAPIError(error: APIError | unknown, fallback: string): string {
  if (!error || typeof error !== 'object') {
    return fallback
  }

  const apiError = error as APIError

  // Handle validation errors (array of ValidationErrorItem)
  if (Array.isArray(apiError.detail)) {
    return parseValidationErrors(apiError.detail)
  }

  // Handle simple string errors
  if (typeof apiError.detail === 'string') {
    return apiError.detail
  }

  return fallback
}

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
      const errorBody = await response.json().catch(() => null)
      const message = parseAPIError(errorBody, 'An unexpected error occurred')
      throw new Error(message)
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
      const errorBody = await response.json().catch(() => null)
      const message = parseAPIError(errorBody, 'Failed to process PDF')
      throw new Error(message)
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

// Export error parsing utilities for custom error handling
export { parseAPIError, parseValidationErrors }
