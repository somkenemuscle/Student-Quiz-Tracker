import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import ErrorMessage from '../../components/ErrorMessage'
import Skeleton from '../../components/Skeleton'
import { useSubmitAttempt } from '../../hooks/useAttempts'
import { useQuiz } from '../../hooks/useQuizzes'
import QuestionCard from './QuestionCard'

function TakeQuizPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const quizId = Number(id)

  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [currentIndex, setCurrentIndex] = useState(0)

  const { data: quiz, isLoading, error } = useQuiz(quizId)
  const mutation = useSubmitAttempt(quizId)

  if (!Number.isInteger(quizId)) {
    return <p className="text-danger">Invalid quiz.</p>
  }

  if (isLoading) {
    return <TakeQuizPageSkeleton />
  }

  if (error) {
    return <ErrorMessage message={error.message} />
  }

  if (!quiz) {
    return <p className="text-ink-muted">Quiz not found.</p>
  }

  const questions = quiz.questions
  const total = questions.length
  const question = questions[currentIndex]
  const isLast = currentIndex === total - 1
  const progress = ((currentIndex + 1) / total) * 100

  function handleContinue(e: React.FormEvent) {
    e.preventDefault()
    if (isLast) {
      mutation.mutate(
        {
          answers: questions.map((q) => ({
            questionId: q.id,
            answer: answers[q.id] ?? '',
          })),
        },
        {
          onSuccess: (attempt) => {
            navigate(`/quiz/${quizId}/results/${attempt.id}`)
          },
        },
      )
    } else {
      setCurrentIndex((i) => i + 1)
    }
  }

  return (
    <div>
      <Breadcrumb />
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
        <QuestionCard
          key={currentIndex}
          text={question.text}
          value={answers[question.id] ?? ''}
          onChange={(value) =>
            setAnswers((prev) => ({ ...prev, [question.id]: value }))
          }
        />

        {mutation.isError && (
          <p className="mt-6 text-sm text-danger">{mutation.error.message}</p>
        )}

        <div className="mt-8 flex items-center justify-between">
          {currentIndex > 0 ? (
            <button
              type="button"
              onClick={() => setCurrentIndex((i) => i - 1)}
              className="cursor-pointer text-xs font-bold uppercase tracking-wider text-ink-muted hover:text-accent"
            >
              ← Back
            </button>
          ) : (
            <span />
          )}

          <button
            type="submit"
            disabled={mutation.isPending}
            className="cursor-pointer rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
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

function TakeQuizPageSkeleton() {
  return (
    <div>
      <Skeleton className="h-4 w-24 rounded" />
      <Skeleton className="mt-3 h-8 w-64 rounded" />

      <div className="mt-8">
        <Skeleton className="h-4 w-32 rounded" />
        <Skeleton className="mt-2 h-2 w-full rounded-full" />
      </div>

      <div className="mt-8 rounded-lg border border-black/20 p-6 shadow-md">
        <Skeleton className="h-8 w-full rounded" />
        <Skeleton className="mt-3 h-8 w-2/3 rounded" />
        <Skeleton className="mt-6 h-8 w-full rounded" />
      </div>
    </div>
  )
}

export default TakeQuizPage
