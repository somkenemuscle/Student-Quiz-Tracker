import { RotateCcw } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import ErrorMessage from '../../components/ErrorMessage'
import Skeleton from '../../components/Skeleton'
import { useAttempt } from '../../hooks/useAttempts'
import ScoreCard from './ScoreCard'

function ResultsPage() {
  const { attemptId } = useParams()
  const id = Number(attemptId)

  const { data: attempt, isLoading, error } = useAttempt(id)

  if (!Number.isInteger(id)) {
    return <ErrorMessage message="Invalid result." />
  }

  if (isLoading) {
    return <ResultsPageSkeleton />
  }

  if (error) {
    return <ErrorMessage message={error.message} />
  }

  if (!attempt) {
    return <p className="text-ink-muted">Result not found.</p>
  }

  return (
    <div>
      <Breadcrumb />
      <p className="mt-3 text-2xl font-extrabold tracking-tight text-ink">{attempt.quiz.title}</p>

      <ScoreCard score={attempt.score} total={attempt.total} />

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          to={`/quiz/${attempt.quizId}`}
          className="inline-flex rounded-lg items-center justify-center gap-2 border border-black/20 px-6 py-2.5 text-sm text-ink shadow-sm hover:bg-ink/3"
        >
          <RotateCcw className="h-4 w-4" />
          Retake quiz
        </Link>
        <Link
          to="/"
          className="inline-flex rounded-lg items-center justify-center bg-accent px-6 py-2.5 text-sm text-white hover:bg-accent-hover"
        >
          Back to quizzes
        </Link>
      </div>
    </div>
  )
}

function ResultsPageSkeleton() {
  return (
    <div>
      <Skeleton className="h-4 w-24 rounded" />
      <Skeleton className="mt-3 h-8 w-64 rounded" />

      <div className="mt-8 rounded-lg border border-black/20 p-10 text-center shadow-md">
        <Skeleton className="mx-auto h-20 w-40 rounded" />
        <Skeleton className="mx-auto mt-4 h-4 w-56 rounded" />
        <Skeleton className="mx-auto mt-6 h-2 w-full max-w-xs rounded-full" />
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Skeleton className="h-11 w-32 rounded-lg" />
        <Skeleton className="h-11 w-36 rounded-lg" />
      </div>
    </div>
  )
}

export default ResultsPage
