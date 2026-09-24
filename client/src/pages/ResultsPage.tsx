import { useQuery } from '@tanstack/react-query'
import { RotateCcw } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { getAttempt } from '../lib/api'

function ResultsPage() {
  const { attemptId } = useParams()
  const id = Number(attemptId)

  const { data: attempt, isLoading, error } = useQuery({
    queryKey: ['attempt', id],
    queryFn: () => getAttempt(id),
    enabled: Number.isInteger(id),
  })

  if (!Number.isInteger(id)) {
    return <p className="text-danger">Invalid result.</p>
  }

  if (isLoading) {
    return <p className="text-ink-muted">Loading results…</p>
  }

  if (error) {
    return <p className="text-danger">{error.message}</p>
  }

  if (!attempt) {
    return <p className="text-ink-muted">Result not found.</p>
  }

  const percentage = Math.round((attempt.score / attempt.total) * 100)
  const scoreColor =
    percentage >= 80 ? 'text-success' : percentage >= 50 ? 'text-accent' : 'text-danger'
  const barColor =
    percentage >= 80 ? 'bg-success' : percentage >= 50 ? 'bg-accent' : 'bg-danger'

  return (
    <div>
      <Link
        to="/"
        className="text-xs font-bold uppercase tracking-wider text-ink-muted hover:text-accent"
      >
        Quizzes <span className="ml-0.5">&gt;</span>
      </Link>
      <p className="mt-3 text-2xl font-extrabold tracking-tight text-ink">{attempt.quiz.title}</p>

      <div className="mt-8 rounded-xl border-3 border-ink p-10 text-center shadow-md">
        <p className={`text-7xl font-extrabold tracking-tight ${scoreColor}`}>
          {attempt.score}/{attempt.total}
        </p>
        <p className="mt-3 text-ink-muted">
          You answered {attempt.score} out of {attempt.total} question
          {attempt.total === 1 ? '' : 's'} correctly.
        </p>

        <div className="mx-auto mt-6 h-2 w-full max-w-xs overflow-hidden rounded-full bg-border">
          <div
            className={`h-full rounded-full transition-all ${barColor}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="mt-2 text-xs font-bold uppercase tracking-wider text-ink-muted">
          {percentage}%
        </p>
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          to={`/quiz/${attempt.quizId}`}
          className="inline-flex items-center justify-center gap-2 border-3 border-ink px-6 py-2.5 text-sm text-ink hover:bg-ink/3"
        >
          <RotateCcw className="h-4 w-4" />
          Retake quiz
        </Link>
        <Link
          to="/"
          className="inline-flex items-center justify-center bg-accent px-6 py-2.5 text-sm text-white hover:bg-accent-hover"
        >
          Back to quizzes
        </Link>
      </div>
    </div>
  )
}

export default ResultsPage
