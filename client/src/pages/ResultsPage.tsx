import { useQuery } from '@tanstack/react-query'
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
    return <p>Invalid result.</p>
  }

  if (isLoading) {
    return <p>Loading results...</p>
  }

  if (error) {
    return <p>{error.message}</p>
  }

  if (!attempt) {
    return <p>Result not found.</p>
  }

  const percentage = Math.round((attempt.score / attempt.total) * 100)

  return (
    <div className="text-center">
      <p className="text-sm font-medium text-slate-500">{attempt.quiz.title}</p>
      <h1 className="mt-2 text-4xl font-semibold text-slate-900">
        {attempt.score} / {attempt.total}
      </h1>
      <p className="mt-1 text-slate-500">{percentage}% correct</p>

      <div className="mt-8 flex justify-center gap-3">
        <Link
          to={`/quiz/${attempt.quizId}`}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
        >
          Retake quiz
        </Link>
        <Link
          to="/"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Back to quizzes
        </Link>
      </div>
    </div>
  )
}

export default ResultsPage
