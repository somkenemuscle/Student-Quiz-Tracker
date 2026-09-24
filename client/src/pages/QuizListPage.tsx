import { useQuery } from '@tanstack/react-query'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getQuizzes } from '../lib/api'

const bandColors = ['bg-orange-500', 'bg-emerald-600', 'bg-violet-600']

function QuizListPage() {
  const { data: quizzes, isLoading, error } = useQuery({
    queryKey: ['quizzes'],
    queryFn: getQuizzes,
  })

  if (isLoading) {
    return <p className="text-ink-muted">Loading quizzes…</p>
  }

  if (error) {
    return <p className="text-danger">{error.message}</p>
  }

  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg text-ink-muted">No quizzes yet.</p>
        <Link
          to="/create"
          className="mt-5 inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-hover"
        >
          + Create quiz
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-4xl font-extrabold tracking-tight text-ink">Your quizzes</h1>
      <p className="mt-2 text-lg text-ink-muted">Test your knowledge with a quick quiz.</p>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {quizzes.map((quiz, index) => (
          <Link
            key={quiz.id}
            to={`/quiz/${quiz.id}`}
            className="group relative flex flex-col overflow-hidden rounded-lg border-3 border-ink shadow-md"
          >
            <span className="absolute right-4 top-4 text-ink-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
              <ArrowUpRight className="h-5 w-5" />
            </span>

            <div className="flex flex-col gap-3 p-6">
              <p className="pr-6 text-xl font-bold text-ink">{quiz.title}</p>
              <p className="text-sm text-ink-muted font-mono">
                {quiz._count.questions} question{quiz._count.questions === 1 ? '' : 's'}
              </p>
              <span className="mt-1 font-mono inline-flex w-fit items-center gap-1 text-sm font-medium text-ink group-hover:underline">
                Take Quiz →
              </span>
            </div>

            <div className={`h-2.5 ${bandColors[index % bandColors.length]}`} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default QuizListPage
