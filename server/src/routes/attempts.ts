import { Router } from 'express'
import { parseIdParam } from '../lib/parseIdParam'
import { prisma } from '../lib/prisma'

export const attemptsRouter = Router()

attemptsRouter.get('/:id', async (req, res) => {
  const id = parseIdParam(req.params.id)

  if (id === null) {
    return res.status(400).json({ error: 'Invalid attempt id' })
  }

  const attempt = await prisma.attempt.findUnique({
    where: { id },
    include: {
      quiz: {
        select: { title: true },
      },
    },
  })

  if (!attempt) {
    return res.status(404).json({ error: 'Attempt not found' })
  }

  res.json(attempt)
})
