import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getQuiz, submitAttempt } from '../lib/api'

function TakeQuizPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const quizId = Number(id)

  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [currentIndex, setCurrentIndex] = useState(0)

  const { data: quiz, isLoading, error } = useQuery({
    queryKey: ['quiz', quizId],
    queryFn: () => getQuiz(quizId),
    enabled: Number.isInteger(quizId),
  })

  const mutation = useMutation({
    mutationFn: () =>
      submitAttempt(quizId, {
        answers: (quiz?.questions ?? []).map((q) => ({
          questionId: q.id,
          answer: answers[q.id] ?? '',
        })),
      }),
    onSuccess: (attempt) => {
      navigate(`/quiz/${quizId}/results/${attempt.id}`)
    },
  })

  if (!Number.isInteger(quizId)) {
    return <p className="text-danger">Invalid quiz.</p>
  }

  if (isLoading) {
    return <p className="text-ink-muted">Loading quiz…</p>
  }

  if (error) {
    return <p className="text-danger">{error.message}</p>
  }

  if (!quiz) {
    return <p className="text-ink-muted">Quiz not found.</p>
  }

  const total = quiz.questions.length
  const question = quiz.questions[currentIndex]
  const isLast = currentIndex === total - 1
  const progress = ((currentIndex + 1) / total) * 100

  function handleContinue(e: React.FormEvent) {
    e.preventDefault()
    if (isLast) {
      mutation.mutate()
    } else {
      setCurrentIndex((i) => i + 1)
    }
  }

  return (
    <div>
      <Link
        to="/"
        className="text-xs font-bold uppercase tracking-wider text-ink-muted hover:text-accent"
      >
        Quizzes <span className="ml-0.5">&gt;</span>
      </Link>
      <p className="mt-3 text-2xl font-extrabold tracking-tight text-ink">{quiz.title}</p>

      <div className="mt-8">
        <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">
          Question {currentIndex + 1} of {total}
        </p>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-accent transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleContinue}>
        <div className="mt-8 rounded-xl border-3 border-ink p-6 shadow-md">
          <p className="text-2xl font-bold text-ink">{question.text}</p>

          <label htmlFor="answer" className="sr-only">
            Your answer
          </label>
          <input
            id="answer"
            type="text"
            required
            autoFocus
            value={answers[question.id] ?? ''}
            onChange={(e) =>
              setAnswers((prev) => ({ ...prev, [question.id]: e.target.value }))
            }
            placeholder="Type your answer…"
            className="mt-6 w-full border-b border-border bg-transparent py-2 text-lg text-ink focus:border-ink focus:outline-none"
          />
        </div>

        {mutation.isError && (
          <p className="mt-6 text-sm text-danger">{mutation.error.message}</p>
        )}

        <div className="mt-8 flex items-center justify-between">
          {currentIndex > 0 ? (
            <button
              type="button"
              onClick={() => setCurrentIndex((i) => i - 1)}
              className="text-xs font-bold uppercase tracking-wider text-ink-muted hover:text-accent"
            >
              ← Back
            </button>
          ) : (
            <span />
          )}

          <button
            type="submit"
            disabled={mutation.isPending}
            className="rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover disabled:opacity-50"
          >
            {isLast
              ? mutation.isPending
                ? 'Submitting…'
                : 'Submit Quiz'
              : 'Next'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TakeQuizPage
