import { Router } from 'express'
import { loginController, logoutController } from './controllers/index.js'

const authRouter = Router()

authRouter.post('/login', loginController.run)
authRouter.post('/logout', logoutController.run)

export { authRouter }
