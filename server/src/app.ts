import cors from 'cors'
import express, { type NextFunction, type Request, type Response } from 'express'
import morgan from 'morgan'
import { router } from './routes'

export const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/api', router)

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})
