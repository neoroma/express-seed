import express from 'express'
import bp from 'body-parser'
import axios from 'axios'

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

const errorHandler = (res) => (error) => {
  const {
    response: { status = 400 },
  } = error
  res.status(status).json({ error: error.toString(), source: 'Error catcher level 1' })
}

app.post('/todos', async ({ body }, res, next) => {
  const { id } = body
  const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`).catch(next)

  if (response) {
    const { data } = response
    res.json(data)
  }
})

app.use((error, req, res, next) => {
  return errorHandler(res)(error)
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
