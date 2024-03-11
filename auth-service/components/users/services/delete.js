import pgPromise from 'pg-promise'
import { database } from "~libs/database.js";

const { ParameterizedQuery } = pgPromise()

const deleteUser = new ParameterizedQuery('DELETE FROM users WHERE id = $1 RETURNING id')

const deleteUserService = async (userId) => {
  deleteUser.values = [userId]

  const id = await database.oneOrNone(deleteUser)

  return id

}

export { deleteUserService }
