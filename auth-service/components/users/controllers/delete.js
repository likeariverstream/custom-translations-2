import { BaseController } from '../../../base-classes/base-controller.js'
import { deleteUserService } from "../services/index.js";

class DeleteUserController extends BaseController {
  get querySchema() {
    return {
      type: 'object',
      additionalProperties: false,
      properties: {
        id: { type: 'string', pattern: '^\\d+$' }
      }
    }
  }

  async controller(req) {
    const { userId } = req.params

    const id = await deleteUserService(userId)

    return id
  }

}

const deleteUserController = new DeleteUserController()

export { deleteUserController }
