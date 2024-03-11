import { database } from '~libs/database.js'
import pgPromise from 'pg-promise'

const { ParameterizedQuery } = pgPromise()

const userEmail = new ParameterizedQuery('SELECT id, name, surname, email, role FROM users where email = $1')

const getUserByEmailService = async (email) => {
  userEmail.values = [email]

  const user = await database.oneOrNone(userEmail)

  return user

}

export { getUserByEmailService }
