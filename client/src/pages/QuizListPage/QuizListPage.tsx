import { Link } from 'react-router-dom'
import ErrorMessage from '../../components/ErrorMessage'
import { useQuizzes } from '../../hooks/useQuizzes'
import { QuizCard, QuizCardSkeleton } from './QuizCard'

function QuizListPage() {
  const { data: quizzes, isLoading, error } = useQuizzes()

  if (isLoading) {
    return <QuizListPageSkeleton />
  }

  if (error) {
    return <ErrorMessage message={error.message} />
  }

  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg text-ink-muted">No quizzes yet.</p>
        <Link
          to="/create"
          className="mt-5 inline-block rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-hover"
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
          <QuizCard key={quiz.id} quiz={quiz} index={index} />
        ))}
      </div>
    </div>
  )
}

function QuizListPageSkeleton() {
  return (
    <div>
      <h1 className="text-4xl font-extrabold tracking-tight text-ink">Your quizzes</h1>
      <p className="mt-2 text-lg text-ink-muted">Test your knowledge with a quick quiz.</p>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <QuizCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

export default QuizListPage
