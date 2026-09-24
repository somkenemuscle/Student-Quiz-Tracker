import { Router } from 'express'
import { z } from 'zod'
import { parseIdParam } from '../lib/parseIdParam'
import { prisma } from '../lib/prisma'

export const quizzesRouter = Router()

const createQuizSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200, 'Title is too long'),
  questions: z
    .array(
      z.object({
        text: z
          .string()
          .trim()
          .min(1, 'Question text is required')
          .max(500, 'Question text is too long'),
        correctAnswer: z
          .string()
          .trim()
          .min(1, 'Correct answer is required')
          .max(200, 'Correct answer is too long'),
      }),
    )
    .min(1, 'At least one question is required'),
})

quizzesRouter.post('/', async (req, res) => {
  const parseResult = createQuizSchema.safeParse(req.body)

  if (!parseResult.success) {
    return res.status(400).json({ error: parseResult.error.issues[0].message })
  }

  const { title, questions } = parseResult.data

  const quiz = await prisma.quiz.create({
    data: {
      title,
      questions: {
        create: questions,
      },
    },
    include: {
      questions: true,
    },
  })

  res.status(201).json(quiz)
})

const submitAttemptSchema = z.object({
  answers: z.array(
    z.object({
      questionId: z.number().int(),
      answer: z.string().max(500, 'Answer is too long'),
    }),
  ),
})

function normalize(value: string) {
  return value.trim().toLowerCase()
}

quizzesRouter.get('/', async (_req, res) => {
  const quizzes = await prisma.quiz.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { questions: true },
      },
    },
  })

  res.json(quizzes)
})

quizzesRouter.get('/:id', async (req, res) => {
  const id = parseIdParam(req.params.id)

  if (id === null) {
    return res.status(400).json({ error: 'Invalid quiz id' })
  }

  const quiz = await prisma.quiz.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      createdAt: true,
      questions: {
        select: {
          id: true,
          text: true,
        },
      },
    },
  })

  if (!quiz) {
    return res.status(404).json({ error: 'Quiz not found' })
  }

  res.json(quiz)
})

quizzesRouter.post('/:id/attempts', async (req, res) => {
  const id = parseIdParam(req.params.id)

  if (id === null) {
    return res.status(400).json({ error: 'Invalid quiz id' })
  }

  const parseResult = submitAttemptSchema.safeParse(req.body)

  if (!parseResult.success) {
    return res.status(400).json({ error: parseResult.error.issues[0].message })
  }

  const quiz = await prisma.quiz.findUnique({
    where: { id },
    select: {
      questions: {
        select: {
          id: true,
          correctAnswer: true,
        },
      },
    },
  })

  if (!quiz) {
    return res.status(404).json({ error: 'Quiz not found' })
  }

  const submittedByQuestionId = new Map(
    parseResult.data.answers.map((a) => [a.questionId, a.answer]),
  )

  const score = quiz.questions.reduce((count, question) => {
    const submitted = submittedByQuestionId.get(question.id)
    const isCorrect = submitted !== undefined && normalize(submitted) === normalize(question.correctAnswer)
    return isCorrect ? count + 1 : count
  }, 0)

  const attempt = await prisma.attempt.create({
    data: {
      quizId: id,
      score,
      total: quiz.questions.length,
    },
  })

  res.status(201).json(attempt)
})
