import { BaseController } from '~base-classes/base-controller.js'
import { getTokensService, getUserByEmailAndPasswordService } from '../services/index.js'

class LoginController extends BaseController {
  get bodySchema() {
    return {
      type: 'object',
      additionalProperties: false,
      required: ['email', 'password'],
      properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string' },
      }
    }
  }

  async controller(req) {
    const { email, password } = req.body

    const user = await getUserByEmailAndPasswordService({ email, password })

    if (!user) {
      throw new Error('Email или пароль неверен')
    }

    const session = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.role,
    }

    const tokens = await getTokensService(session)

    return tokens
  }
}

const loginController = new LoginController()

export { loginController }
