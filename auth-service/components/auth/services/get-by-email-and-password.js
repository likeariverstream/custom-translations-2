import { database } from '~libs/database.js'
import pgPromise from 'pg-promise'
import { sha256 } from '~utils/sha-256.js'

const { ParameterizedQuery } = pgPromise()

const userData = new ParameterizedQuery('SELECT id, name, surname, email, role FROM users WHERE email = $1 AND password = $2')

const getUserByEmailAndPasswordService = async ({ email, password }) => {
  const hashPassword = sha256(password)

  userData.values = [email, hashPassword]

  const user = await database.one(userData)

  return user
}

export { getUserByEmailAndPasswordService }
