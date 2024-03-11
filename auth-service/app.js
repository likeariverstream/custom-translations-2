import express from 'express'
import config from 'config'
import { usersRouter } from '~components/users/router.js'
import { database } from '~libs/database.js'
import { authRouter } from '~components/auth/router.js'

const app = express()

app.use(express.json())

database.connect()
  .then(() => console.log('Database connected'))
  .catch((error) => console.log(`Connected error: ${error}`))

app.use(usersRouter)

app.use(authRouter)

const port = config.get('SERVER.PORT')
app.listen(port, () => console.log(`Server started on ${port}`))
