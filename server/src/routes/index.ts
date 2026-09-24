import { Router } from 'express'
import { attemptsRouter } from './attempts'
import { healthRouter } from './health'
import { quizzesRouter } from './quizzes'

export const router = Router()

router.use(healthRouter)
router.use('/quizzes', quizzesRouter)
router.use('/attempts', attemptsRouter)
