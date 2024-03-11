import { BaseError } from '../base-classes/base-error.js'

export class ValidationError extends BaseError {
  constructor(errorsData) {
    super('Validation error', errorsData)
    this.statusCode = 400
  }
}