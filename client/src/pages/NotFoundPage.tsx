import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-extrabold tracking-tight text-ink">Page not found</h1>
      <p className="mt-2 text-ink-muted">The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover"
      >
        Back to quizzes
      </Link>
    </div>
  )
}

export default NotFoundPage
