import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-5">
        <Link to="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-ink">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-white">
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
          className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-hover"
        >
          + Create quiz
        </Link>
      </div>
    </header>
  )
}

export default Navbar
