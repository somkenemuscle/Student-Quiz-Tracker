import { useMutation, useQuery } from '@tanstack/react-query'
import { getAttempt, submitAttempt } from '../lib/api'
import type { SubmitAttemptInput } from '../lib/types'

export function useSubmitAttempt(quizId: number) {
  return useMutation({
    mutationFn: (data: SubmitAttemptInput) => submitAttempt(quizId, data),
  })
}

export function useAttempt(id: number) {
  return useQuery({
    queryKey: ['attempt', id],
    queryFn: () => getAttempt(id),
    enabled: Number.isInteger(id),
  })
}
