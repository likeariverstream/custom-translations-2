import { database } from '~libs/database.js'
import pgPromise from 'pg-promise'
import { sha256 } from '~utils/sha-256.js'

const { ParameterizedQuery } = pgPromise()

const create = new ParameterizedQuery(`INSERT INTO users(name, surname, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING id`)

const createUserService = async (userData) => {
  const { name, surname, email, password, role } = userData

  const hashPassword = sha256(password)

  create.values = [name, surname, email, hashPassword, role]

  const id =  await database.one(create)

  return id

}

export { createUserService }
