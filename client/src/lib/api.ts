import type {
  Attempt,
  AttemptWithQuiz,
  CreateQuizInput,
  QuizDetail,
  QuizSummary,
  SubmitAttemptInput,
} from './types'

const API_URL = import.meta.env.VITE_API_URL

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new Error(body?.error ?? 'Something went wrong')
  }

  return res.json()
}

export function getQuizzes() {
  return request<QuizSummary[]>('/api/quizzes')
}

export function getQuiz(id: number) {
  return request<QuizDetail>(`/api/quizzes/${id}`)
}

export function createQuiz(data: CreateQuizInput) {
  return request<QuizDetail>('/api/quizzes', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function submitAttempt(quizId: number, data: SubmitAttemptInput) {
  return request<Attempt>(`/api/quizzes/${quizId}/attempts`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function getAttempt(id: number) {
  return request<AttemptWithQuiz>(`/api/attempts/${id}`)
}
