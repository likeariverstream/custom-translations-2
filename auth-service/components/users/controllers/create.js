import { BaseController } from '../../../base-classes/base-controller.js'
import { createUserService } from '../services/index.js'
import { getUserByEmailService } from '../services/index.js'

class CreateUserController extends BaseController {

  get bodySchema() {
    return {
      type: 'object',
      required: ['name', 'surname', 'email', 'password', 'role'],
      additionalProperties: false,
      properties: {
        name: { type: 'string' },
        surname: { type: 'string' },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$' },
        role: { type: 'string', pattern: 'admin|user' }
      },
    }
  }

  async controller(req) {

    const { name, surname, email, password, role } = req.body

    const existingUser = await getUserByEmailService(email)

    if (existingUser) {
      throw new Error('User already exist')
    }

    const userData = {
      name,
      surname,
      email,
      password,
      role,
    }

    const id = await createUserService(userData)

    return id
  }

}

const createUserController = new CreateUserController()

export { createUserController }
