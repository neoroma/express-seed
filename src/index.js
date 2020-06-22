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
  res.status(status).json({ error: error.toString() })
}

app.post('/todos', async ({ body }, res) => {
  const { id } = body

  try {
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`)
    res.json(data)
  } catch (error) {
    errorHandler(res)(error)
  }
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
