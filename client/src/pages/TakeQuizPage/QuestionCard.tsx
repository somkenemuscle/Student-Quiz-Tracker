type QuestionCardProps = {
  text: string
  value: string
  onChange: (value: string) => void
}

function QuestionCard({ text, value, onChange }: QuestionCardProps) {
  return (
    <div className="fade-in mt-8 rounded-lg border border-black/20 p-6 shadow-md">
      <p className="text-2xl font-bold text-stone-700">{text}</p>

      <label htmlFor="answer" className="sr-only">
        Your answer
      </label>
      <input
        id="answer"
        type="text"
        required
        autoFocus
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your answer…"
        className="mt-6 w-full border-b border-border bg-transparent py-2 text-lg text-ink focus:border-ink focus:outline-none"
      />
    </div>
  )
}

export default QuestionCard
