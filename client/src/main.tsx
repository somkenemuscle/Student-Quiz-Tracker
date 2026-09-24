import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import CreateQuizPage from './pages/CreateQuizPage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import QuizListPage from './pages/QuizListPage.tsx'
import ResultsPage from './pages/ResultsPage.tsx'
import TakeQuizPage from './pages/TakeQuizPage.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route index element={<QuizListPage />} />
            <Route path="create" element={<CreateQuizPage />} />
            <Route path="quiz/:id" element={<TakeQuizPage />} />
            <Route path="quiz/:id/results/:attemptId" element={<ResultsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
