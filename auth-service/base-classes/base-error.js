export class BaseError extends Error {

  constructor(message, errorsData) {
    super(message)

    const { code, text, data } = errorsData

    this.code = code
    this.text = text
    this.data = data
    this.statusCode = 500

  }

}
