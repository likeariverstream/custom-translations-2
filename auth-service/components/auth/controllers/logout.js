import { BaseController } from '~base-classes/base-controller.js'
import { deleteTokensService } from "../services/index.js";

class LogoutController extends BaseController {
  async controller(req) {
    const { authorization } = req.headers

    const id = await deleteTokensService(authorization)

    return id
  }

}

const logoutController = new LogoutController()

export { logoutController }
