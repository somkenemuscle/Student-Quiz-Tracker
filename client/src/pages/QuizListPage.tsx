import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { getQuizzes } from '../lib/api'

function QuizListPage() {
  const { data: quizzes, isLoading, error } = useQuery({
    queryKey: ['quizzes'],
    queryFn: getQuizzes,
  })

  if (isLoading) {
    return <p>Loading quizzes...</p>
  }

  if (error) {
    return <p>{error.message}</p>
  }

  if (!quizzes || quizzes.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Quizzes</h1>
        <p className="mt-2 text-slate-500">
          No quizzes yet. <Link to="/create" className="text-indigo-600">Create one</Link>.
        </p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Quizzes</h1>
      <ul className="mt-4 space-y-2">
        {quizzes.map((quiz) => (
          <li key={quiz.id}>
            <Link
              to={`/quiz/${quiz.id}`}
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 hover:border-indigo-300"
            >
              <span className="font-medium text-slate-900">{quiz.title}</span>
              <span className="text-sm text-slate-500">
                {quiz._count.questions} question{quiz._count.questions === 1 ? '' : 's'}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default QuizListPage
