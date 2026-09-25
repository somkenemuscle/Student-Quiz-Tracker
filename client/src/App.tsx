import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="min-h-screen bg-paper">
      <Navbar />

      <main className="mx-auto max-w-3xl px-4 py-10">
        <Outlet />
      </main>
    </div>
  )
}

export default App
