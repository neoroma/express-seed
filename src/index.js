import express from 'express'
import bp from 'body-parser'

const app = express()
const port = process.env.PORT || 3015

app.use(bp.json())
app.get('/', (req, res) => res.send('Hello World!'))

app.post('/message', ({ body }, res) => {
  const { question } = body
  res.json({
    question,
    answer: '😼',
  })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
