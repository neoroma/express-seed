import express from 'express'
import bp from 'body-parser'
import axios from 'axios'
import { errorHandler } from './util/error-handler.js'
import { BadRequestError } from './BadRequestError.js'

const app = express()
const port = process.env.PORT || 3015

app.use(bp.json())
app.get('/', (req, res) => res.send('Hello World!'))

app.post('/message', ({ body }, res) => {
  const { question } = body
  console.log('This is the question', question)
  res.json({
    question,
    answer: '😼',
  })
})

app.post('/todos', async ({ body }, res, next) => {
  const { id } = body
  const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`).catch(next)

  if (response) {
    const { data } = response
    res.json(data)
  }
})

app.get('/not-found', (_, res) => res.status(404).send('This thing is not found'))

app.get('*', function (req, res, next) {
  const error = new Error(`${req.ip} tried to access ${req.originalUrl}`)
  next(new BadRequestError(error, 301))
})

app.use((error, req, res, next) => {
  return errorHandler(res)(error)
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
