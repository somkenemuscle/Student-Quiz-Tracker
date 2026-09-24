import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Field from '../components/Field'
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
      <Link
        to="/"
        className="text-xs font-bold uppercase tracking-wider text-ink-muted hover:text-accent"
      >
        Quizzes <span className="ml-0.5">&gt;</span>
      </Link>
      <p className="mt-3 text-2xl font-extrabold tracking-tight text-ink">Create Quiz</p>

      <form onSubmit={handleSubmit} className="mt-8">
        <div className="rounded-xl border-3 border-ink p-6 shadow-md">
          <Field
            id="title"
            label="Quiz title"
            large
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mt-6 space-y-5">
          {questions.map((question, index) => (
            <div key={index} className="rounded-xl border-3 border-ink p-6 shadow-md">
              <div className="flex items-center justify-between">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">
                  {index + 1}
                </span>
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(index)}
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-danger"
                  >
                    <X className="h-3.5 w-3.5" />
                    Remove
                  </button>
                )}
              </div>

              <div className="mt-4 space-y-4">
                <Field
                  label="Question text"
                  required
                  value={question.text}
                  onChange={(e) => updateQuestion(index, 'text', e.target.value)}
                />
                <Field
                  label="Correct answer"
                  required
                  value={question.correctAnswer}
                  onChange={(e) => updateQuestion(index, 'correctAnswer', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addQuestion}
          className="mt-6 inline-flex items-center gap-2  border-3 border-ink px-5 py-2 text-sm font-semibold text-ink hover:bg-ink/3"
        >
          <Plus className="h-4 w-4" />
          Add question
        </button>

        {mutation.isError && (
          <p className="mt-6 text-sm text-danger">{mutation.error.message}</p>
        )}

        <div className="mt-8">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover disabled:opacity-50"
          >
            {mutation.isPending ? 'Creating…' : 'Create Quiz'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateQuizPage
