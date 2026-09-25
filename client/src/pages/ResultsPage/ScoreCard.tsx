type ScoreCardProps = {
  score: number
  total: number
}

function ScoreCard({ score, total }: ScoreCardProps) {
  const percentage = Math.round((score / total) * 100)
  const scoreColor =
    percentage >= 80 ? 'text-success' : percentage >= 50 ? 'text-accent' : 'text-danger'
  const barColor =
    percentage >= 80 ? 'bg-success' : percentage >= 50 ? 'bg-accent' : 'bg-danger'

  return (
    <div className="mt-8 rounded-lg border border-black/20 p-10 text-center shadow-md">
      <p className={`text-7xl font-extrabold tracking-tight ${scoreColor}`}>
        {score}/{total}
      </p>
      <p className="mt-3 text-ink-muted">
        You answered {score} out of {total} question{total === 1 ? '' : 's'} correctly.
      </p>

      <div className="mx-auto mt-6 h-2 w-full max-w-xs overflow-hidden rounded-full bg-border">
        <div
          className={`h-full rounded-full transition-all ${barColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="mt-2 text-xs font-bold uppercase tracking-wider text-ink-muted">
        {percentage}%
      </p>
    </div>
  )
}

export default ScoreCard
