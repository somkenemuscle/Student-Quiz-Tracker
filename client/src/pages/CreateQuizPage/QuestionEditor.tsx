import { X } from 'lucide-react'
import Field from '../../components/Field'

type QuestionEditorProps = {
  index: number
  text: string
  correctAnswer: string
  canRemove: boolean
  onTextChange: (value: string) => void
  onCorrectAnswerChange: (value: string) => void
  onRemove: () => void
}

function QuestionEditor({
  index,
  text,
  correctAnswer,
  canRemove,
  onTextChange,
  onCorrectAnswerChange,
  onRemove,
}: QuestionEditorProps) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-sm font-bold text-accent">
        {index + 1}
      </span>

      <div className="flex-1 rounded-lg border border-black/20 p-6 shadow-md">
        {canRemove && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onRemove}
              className="inline-flex cursor-pointer items-center gap-1 text-xs font-bold uppercase tracking-wider text-danger hover:underline"
            >
              <X className="h-3.5 w-3.5" />
              Remove
            </button>
          </div>
        )}

        <div className={canRemove ? 'mt-4 space-y-4' : 'space-y-4'}>
          <Field
            label="Question text"
            required
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
          />
          <Field
            label="Correct answer"
            required
            value={correctAnswer}
            onChange={(e) => onCorrectAnswerChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

export default QuestionEditor
