import { database } from '~libs/database.js'
import { redis } from '~libs/redis.js'
import pgPromise from 'pg-promise'

const { ParameterizedQuery } = pgPromise()

const deleteRefreshToken = new ParameterizedQuery('UPDATE users SET refresh_token = null WHERE id = $1 RETURNING id')
const deleteTokensService = async (accessToken) => {
  const session = await redis.get(`access_token_${accessToken}`)

  deleteRefreshToken.values = [JSON.parse(session).id]

  await redis.del(`access_token_${accessToken}`)

  const id = await database.one(deleteRefreshToken)

  return id
}

export { deleteTokensService }
