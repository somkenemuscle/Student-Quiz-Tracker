import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb'
import Field from '../../components/Field'
import { useCreateQuiz } from '../../hooks/useQuizzes'
import QuestionEditor from './QuestionEditor'

type QuestionInput = {
  text: string
  correctAnswer: string
}

function CreateQuizPage() {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [questions, setQuestions] = useState<QuestionInput[]>([
    { text: '', correctAnswer: '' },
  ])

  const mutation = useCreateQuiz()

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
    mutation.mutate({ title, questions }, { onSuccess: () => navigate('/') })
  }

  return (
    <div>
      <Breadcrumb />
      <p className="mt-3 text-2xl font-extrabold tracking-tight text-ink">Create Quiz</p>
      <p className="mt-1 text-ink-muted">
        Give your quiz a title, then add as many questions as you like.
      </p>

      <form onSubmit={handleSubmit} className="mt-8">
        <div className="rounded-lg border border-black/20 p-6 shadow-md">
          <Field
            id="title"
            label="Quiz title"
            large
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mt-6 space-y-6">
          {questions.map((question, index) => (
            <QuestionEditor
              key={index}
              index={index}
              text={question.text}
              correctAnswer={question.correctAnswer}
              canRemove={questions.length > 1}
              onTextChange={(value) => updateQuestion(index, 'text', value)}
              onCorrectAnswerChange={(value) =>
                updateQuestion(index, 'correctAnswer', value)
              }
              onRemove={() => removeQuestion(index)}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={addQuestion}
          className="group mt-6 flex w-full cursor-pointer items-center gap-4 text-left"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-dashed border-accent/40 text-accent">
            <Plus className="h-4 w-4" />
          </span>
          <span className="flex-1 rounded-lg border border-dashed border-black/20 px-6 py-4 text-sm font-semibold text-ink-muted group-hover:border-accent group-hover:text-accent">
            Add another question
          </span>
        </button>

        <div className="mt-10 border-t border-border pt-6">
          {mutation.isError && (
            <p className="mb-4 text-sm text-danger">{mutation.error.message}</p>
          )}

          <button
            type="submit"
            disabled={mutation.isPending}
            className="cursor-pointer rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {mutation.isPending ? 'Creating…' : 'Create Quiz'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateQuizPage
