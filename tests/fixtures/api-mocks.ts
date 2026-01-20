import { Page, Route } from '@playwright/test'
import * as fs from 'fs'
import * as path from 'path'

// Use glob pattern to intercept all API calls regardless of base URL
const API_PATTERN = '**/api/v1/**'

export interface MockAPIOptions {
  generateFromText?: MockEndpointOptions
  generateFromPDF?: MockEndpointOptions
  generateSimilar?: MockEndpointOptions
  refineQuestion?: MockEndpointOptions
}

interface MockEndpointOptions {
  response?: unknown
  delay?: number
  fail?: boolean
  failMessage?: string
}

function loadFixture(filename: string): unknown {
  const fixturePath = path.join(process.cwd(), 'tests/data/api-responses', filename)
  const content = fs.readFileSync(fixturePath, 'utf-8')
  return JSON.parse(content)
}

async function handleMockRoute(
  route: Route,
  config: {
    defaultFile: string
    options?: MockEndpointOptions
  }
) {
  const { defaultFile, options = {} } = config

  // Simulate network delay
  if (options.delay) {
    await new Promise(resolve => setTimeout(resolve, options.delay))
  }

  // Simulate failure
  if (options.fail) {
    return route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ detail: options.failMessage || 'Internal server error' }),
    })
  }

  // Return custom response or load from fixture
  const response = options.response || loadFixture(defaultFile)

  return route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify(response),
  })
}

export async function setupAPIMocks(page: Page, options: MockAPIOptions = {}) {
  // Use glob patterns for flexible URL matching

  // Mock /generate/from-text
  await page.route('**/generate/from-text', async (route: Route) => {
    await handleMockRoute(route, {
      defaultFile: 'generate-from-text.json',
      options: options.generateFromText,
    })
  })

  // Mock /generate/from-pdf
  await page.route('**/generate/from-pdf', async (route: Route) => {
    await handleMockRoute(route, {
      defaultFile: 'generate-from-text.json', // Same response format
      options: options.generateFromPDF,
    })
  })

  // Mock /similar/generate
  await page.route('**/similar/generate', async (route: Route) => {
    await handleMockRoute(route, {
      defaultFile: 'similar-generate.json',
      options: options.generateSimilar,
    })
  })

  // Mock /refine/refine
  await page.route('**/refine/refine', async (route: Route) => {
    await handleMockRoute(route, {
      defaultFile: 'refine-response.json',
      options: options.refineQuestion,
    })
  })
}

// Helper to create dynamic mock question
export function createMockQuestion(overrides: Record<string, unknown> = {}) {
  return {
    id: `q-${Date.now()}`,
    question_text: 'What is the capital of France?',
    question_type: 'mcq',
    difficulty: 'easy',
    topic: 'Geography',
    explanation: 'Paris is the capital and largest city of France.',
    correct_answer: 'Paris',
    options: [
      { label: 'A', text: 'Paris', is_correct: true },
      { label: 'B', text: 'London', is_correct: false },
      { label: 'C', text: 'Berlin', is_correct: false },
      { label: 'D', text: 'Madrid', is_correct: false },
    ],
    confidence_score: 0.95,
    ...overrides,
  }
}

export function createMockGenerateResponse(numQuestions: number = 5) {
  return {
    session_id: `session-${Date.now()}`,
    questions: Array.from({ length: numQuestions }, (_, i) =>
      createMockQuestion({ id: `q-${i + 1}` })
    ),
    generation_summary: `Generated ${numQuestions} questions successfully`,
    source_type: 'text',
  }
}
