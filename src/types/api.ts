// =============================================================================
// API Types - Matching Backend Specification
// =============================================================================

// -----------------------------------------------------------------------------
// Common Types
// -----------------------------------------------------------------------------

export type QuestionType = 'mcq' | 'open_ended'
export type Difficulty = 'easy' | 'medium' | 'hard' | 'mixed'

export interface QuestionOption {
  label: string
  text: string
  is_correct: boolean
}

export interface Question {
  id: string
  question_text: string
  question_type: QuestionType
  difficulty: Difficulty
  topic: string
  explanation: string
  correct_answer: string
  options: QuestionOption[] | null
  confidence_score: number
}

// -----------------------------------------------------------------------------
// Generate from Text
// -----------------------------------------------------------------------------

export interface GenerateFromTextRequest {
  content: string
  num_questions?: number
  question_types?: QuestionType[]
  difficulty?: Difficulty
  topic_focus?: string
}

export interface GenerateResponse {
  session_id: string
  questions: Question[]
  generation_summary: string
  source_type: 'text' | 'pdf'
}

// -----------------------------------------------------------------------------
// Generate from PDF
// -----------------------------------------------------------------------------

export interface GenerateFromPDFRequest {
  file: File
  num_questions?: number
  question_types?: QuestionType[]
  difficulty?: Difficulty
  topic_focus?: string
}

// -----------------------------------------------------------------------------
// Similar Questions
// -----------------------------------------------------------------------------

export interface SimilarGenerateRequest {
  question_text: string
  question_type?: QuestionType
  options?: QuestionOption[]
  correct_answer?: string
  num_similar?: number
  variation_type?: 'paraphrase' | 'difficulty_shift' | 'context_change'
}

export interface OriginalAnalysis {
  core_concept: string
  difficulty_level: string
  question_structure: string
  key_distractors?: string[]
}

export interface SimilarQuestion {
  id: string
  question_text: string
  options?: QuestionOption[]
  correct_answer: string
  variation_type: string
  similarity_score: number
  explanation: string
}

export interface SimilarGenerateResponse {
  session_id: string
  original_analysis: OriginalAnalysis
  similar_questions: SimilarQuestion[]
}

// -----------------------------------------------------------------------------
// Refine Question (Interactive Studio)
// -----------------------------------------------------------------------------

export interface RefineRequest {
  question_state: Question
  instruction: string
  conversation_id?: string | null
}

export interface RefineResponse {
  conversation_id: string
  refined_question: Question
  changes_made: string
  confidence_score: number
  turn_number: number
}

// -----------------------------------------------------------------------------
// API Error Response
// -----------------------------------------------------------------------------

export interface APIError {
  detail: string
  status_code?: number
}
