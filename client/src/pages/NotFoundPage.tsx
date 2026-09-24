import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold text-slate-900">Page not found</h1>
      <p className="mt-2 text-slate-500">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-4 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      >
        Back to quizzes
      </Link>
    </div>
  )
}

export default NotFoundPage
