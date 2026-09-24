import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getQuiz, submitAttempt } from '../lib/api'

function TakeQuizPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const quizId = Number(id)

  const [answers, setAnswers] = useState<Record<number, string>>({})

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
    return <p>Invalid quiz.</p>
  }

  if (isLoading) {
    return <p>Loading quiz...</p>
  }

  if (error) {
    return <p>{error.message}</p>
  }

  if (!quiz) {
    return <p>Quiz not found.</p>
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    mutation.mutate()
  }

  return (
    <div>
      <Link to="/" className="text-sm font-medium text-indigo-600">
        ← Back to quizzes
      </Link>
      <h1 className="mt-2 text-2xl font-semibold text-slate-900">{quiz.title}</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {quiz.questions.map((question, index) => (
          <div key={question.id} className="rounded-lg border border-slate-200 p-4">
            <label htmlFor={`question-${question.id}`} className="block text-sm font-medium text-slate-700">
              {index + 1}. {question.text}
            </label>
            <input
              id={`question-${question.id}`}
              type="text"
              required
              value={answers[question.id] ?? ''}
              onChange={(e) =>
                setAnswers((prev) => ({ ...prev, [question.id]: e.target.value }))
              }
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>
        ))}

        {mutation.isError && (
          <p className="text-sm text-red-600">{mutation.error.message}</p>
        )}

        <button
          type="submit"
          disabled={mutation.isPending}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {mutation.isPending ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}

export default TakeQuizPage
