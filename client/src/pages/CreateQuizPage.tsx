import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createQuiz } from '../lib/api'

type QuestionInput = {
  text: string
  correctAnswer: string
}

function CreateQuizPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [title, setTitle] = useState('')
  const [questions, setQuestions] = useState<QuestionInput[]>([
    { text: '', correctAnswer: '' },
  ])

  const mutation = useMutation({
    mutationFn: createQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] })
      navigate('/')
    },
  })

  function updateQuestion(index: number, field: keyof QuestionInput, value: string) {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, [field]: value } : q)),
    )
  }

  function addQuestion() {
    setQuestions((prev) => [...prev, { text: '', correctAnswer: '' }])
  }

  function removeQuestion(index: number) {
    setQuestions((prev) => prev.filter((_, i) => i !== index))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    mutation.mutate({ title, questions })
  }

  return (
    <div>
      <Link to="/" className="text-sm font-medium text-indigo-600">
        ← Back to quizzes
      </Link>
      <h1 className="mt-2 text-2xl font-semibold text-slate-900">Create Quiz</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>

        <div className="space-y-4">
          {questions.map((question, index) => (
            <div key={index} className="rounded-lg border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">
                  Question {index + 1}
                </span>
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(index)}
                    className="text-sm text-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>

              <input
                type="text"
                required
                placeholder="Question text"
                value={question.text}
                onChange={(e) => updateQuestion(index, 'text', e.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
              />
              <input
                type="text"
                required
                placeholder="Correct answer"
                value={question.correctAnswer}
                onChange={(e) => updateQuestion(index, 'correctAnswer', e.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addQuestion}
          className="text-sm font-medium text-indigo-600"
        >
          + Add question
        </button>

        {mutation.isError && (
          <p className="text-sm text-red-600">{mutation.error.message}</p>
        )}

        <button
          type="submit"
          disabled={mutation.isPending}
          className="rounded-lg bg-indigo-600 ml-4  px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {mutation.isPending ? 'Creating...' : 'Create Quiz'}
        </button>
      </form>
    </div>
  )
}

export default CreateQuizPage
