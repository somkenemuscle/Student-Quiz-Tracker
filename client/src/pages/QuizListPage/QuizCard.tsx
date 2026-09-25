import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Skeleton from '../../components/Skeleton'
import type { QuizSummary } from '../../lib/types'

const bandColors = ['bg-orange-500', 'bg-emerald-600', 'bg-violet-600']

type QuizCardProps = {
  quiz: QuizSummary
  index: number
}

export function QuizCard({ quiz, index }: QuizCardProps) {
  return (
    <Link
      to={`/quiz/${quiz.id}`}
      className="fade-in group relative flex flex-col overflow-hidden rounded-lg border border-black/20 shadow-md"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <span className="absolute right-4 top-4 text-ink-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
        <ArrowUpRight className="h-5 w-5" />
      </span>

      <div className="flex flex-col gap-3 p-6">
        <p className="pr-6 text-xl font-bold text-ink">{quiz.title}</p>
        <p className="font-mono text-sm text-ink-muted">
          {quiz._count.questions} question{quiz._count.questions === 1 ? '' : 's'}
        </p>
        <span className="mt-1 inline-flex w-fit items-center gap-1 font-mono text-sm font-medium text-ink group-hover:underline">
          Take Quiz →
        </span>
      </div>

      <div className={`h-2.5 ${bandColors[index % bandColors.length]}`} />
    </Link>
  )
}

export function QuizCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-black/20 shadow-md">
      <div className="flex flex-col gap-3 p-6">
        <Skeleton className="h-6 w-3/4 rounded" />
        <Skeleton className="h-4 w-1/3 rounded" />
        <Skeleton className="mt-1 h-9 w-28 rounded-lg" />
      </div>
      <Skeleton className="h-2.5" />
    </div>
  )
}
