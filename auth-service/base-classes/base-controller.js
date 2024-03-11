import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import { ValidationError } from '../errors/index.js'

const ajv = new Ajv({ allErrors: true })

export class BaseController {
  constructor() {
    this.controller = this.controller.bind(this)
    this.run = this.run.bind(this)
    this.validate = this.validate.bind(this)
  }

  get bodySchema() {
    return null
  }

  get querySchema() {
    return null
  }

  #createRequestError(error) {
    const { message, data } = error

    return { message, data }
  }

  validate(req) {
    const reqErrors = {}

    if (this.bodySchema) {
      addFormats(ajv, ['email'])

      const validate = ajv.compile(this.bodySchema)

      const isValidReq = validate(req.body)

      if (!isValidReq) {
        const errors = validate.errors.map(this.#createRequestError)

        reqErrors.body = errors
      }

    }

    if (this.querySchema) {
      const validate = ajv.compile(this.querySchema)

      const isValidReq = validate(req.query)

      if (!isValidReq) {
        const errors = validate.errors.map(this.#createRequestError)

        reqErrors.body = errors
      }
    }

    return reqErrors
  }

  controller() {
    throw new SyntaxError('controller required')
  }

  async run(req, res, next) {
    const reqErrors = this.validate(req)

    if (Object.keys(reqErrors).length > 0) {
      throw new ValidationError({
        code: 'validation error',
        text: 'Validation error',
        data: reqErrors,
      })
    }


    try {
      const result = await this.controller(req)

      res.status(200).send(result)

    } catch (err) {
      return next(err)
    }
  }

}
