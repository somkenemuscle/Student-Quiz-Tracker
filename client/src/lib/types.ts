export type QuizSummary = {
  id: number
  title: string
  createdAt: string
  _count: {
    questions: number
  }
}

export type QuizDetail = {
  id: number
  title: string
  createdAt: string
  questions: {
    id: number
    text: string
  }[]
}

export type CreateQuizInput = {
  title: string
  questions: {
    text: string
    correctAnswer: string
  }[]
}

export type SubmitAttemptInput = {
  answers: {
    questionId: number
    answer: string
  }[]
}

export type Attempt = {
  id: number
  quizId: number
  score: number
  total: number
  takenAt: string
}

export type AttemptWithQuiz = Attempt & {
  quiz: {
    title: string
  }
}
