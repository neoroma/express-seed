export const errorHandler = (res) => (error) => {
  const { statusCode, isAxiosError } = error

  if (!isAxiosError && statusCode) {
    if (statusCode === 301) {
      return res.status(301).redirect('/not-found')
    } else {
      return res.status(statusCode).json({ error: error.toString(), source: 'Error catcher level 0' })
    }
  }

  const {
    response: { status = 500 },
  } = error
  return res.status(status).json({ error: error.toString(), source: 'axios' })
}
