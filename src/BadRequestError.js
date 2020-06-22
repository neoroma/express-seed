export class BadRequestError extends Error {
  constructor(error, statusCode = 400) {
    super(error.message)

    this.data = { error }
    this.statusCode = statusCode
  }
}
