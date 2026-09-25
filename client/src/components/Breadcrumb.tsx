import { Link } from 'react-router-dom'

function Breadcrumb() {
  return (
    <Link
      to="/"
      className="text-xs font-bold uppercase tracking-wider text-ink-muted hover:text-accent"
    >
      ← All quizzes
    </Link>
  )
}

export default Breadcrumb
