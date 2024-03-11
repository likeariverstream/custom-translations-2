import { Router } from 'express'
import { createUserController, deleteUserController } from './controllers/index.js'

const usersRouter = Router()

usersRouter.post('/users', createUserController.run)
usersRouter.delete('/users/:userId', deleteUserController.run)

export { usersRouter }
