import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createQuiz, getQuiz, getQuizzes } from '../lib/api'

export function useQuizzes() {
  return useQuery({
    queryKey: ['quizzes'],
    queryFn: getQuizzes,
  })
}

export function useQuiz(id: number) {
  return useQuery({
    queryKey: ['quiz', id],
    queryFn: () => getQuiz(id),
    enabled: Number.isInteger(id),
  })
}

export function useCreateQuiz() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] })
    },
  })
}
