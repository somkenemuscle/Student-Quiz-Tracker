import { Link, Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2 font-semibold text-slate-900">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <svg viewBox="0 0 32 32" className="h-4 w-4" fill="none">
                <path
                  d="M9 16.5L14 21.5L23 11"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Quiz Tracker
          </Link>
          <Link
            to="/create"
            className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Create Quiz
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default App
