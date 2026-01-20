import { create } from 'zustand'
import type { Question, Message, StudioSession } from '@/types'

interface StudioState {
  // Current studio session
  session: StudioSession | null

  // Conversation messages
  messages: Message[]

  // Current question being refined
  question: Question | null

  // Conversation ID from backend
  conversationId: string | null

  // Turn number
  turnNumber: number

  // Loading state
  isRefining: boolean

  // Actions
  initSession: (question: Question) => void
  addMessage: (message: Message) => void
  updateQuestion: (question: Question) => void
  setConversationId: (id: string) => void
  incrementTurn: () => void
  setRefining: (isRefining: boolean) => void
  resetSession: () => void
}

export const useStudioStore = create<StudioState>((set, get) => ({
  session: null,
  messages: [],
  question: null,
  conversationId: null,
  turnNumber: 0,
  isRefining: false,

  initSession: (question) => {
    const session: StudioSession = {
      id: crypto.randomUUID(),
      conversationId: null,
      question,
      history: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    set({
      session,
      question,
      messages: [],
      conversationId: null,
      turnNumber: 0,
      isRefining: false,
    })
  },

  addMessage: (message) => {
    set((state) => ({
      messages: [...state.messages, message],
      session: state.session
        ? { ...state.session, updatedAt: new Date() }
        : null,
    }))
  },

  updateQuestion: (question) => {
    set((state) => ({
      question,
      session: state.session
        ? { ...state.session, question, updatedAt: new Date() }
        : null,
    }))
  },

  setConversationId: (id) => {
    set((state) => ({
      conversationId: id,
      session: state.session
        ? { ...state.session, conversationId: id }
        : null,
    }))
  },

  incrementTurn: () => {
    set((state) => ({ turnNumber: state.turnNumber + 1 }))
  },

  setRefining: (isRefining) => {
    set({ isRefining })
  },

  resetSession: () => {
    set({
      session: null,
      messages: [],
      question: null,
      conversationId: null,
      turnNumber: 0,
      isRefining: false,
    })
  },
}))
