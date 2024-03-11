import { database } from '~libs/database.js'
import { redis } from '~libs/redis.js'
import pgPromise from 'pg-promise'
import jwt from 'jsonwebtoken'
import { addDays } from 'date-fns'
import config from 'config'

const { ParameterizedQuery } = pgPromise()

const addRefreshToken = new ParameterizedQuery('UPDATE users SET refresh_token = $1 WHERE id = $2')

const getSessionId = new ParameterizedQuery('SELECT id FROM users WHERE refresh_token = $1')

const getTokensService = async (session) => {
  const now = Date.now()

  const accessTokenData = {
    ...session,
    expire: addDays(now, 7)
  }

  const refreshTokenData = {
    ...session,
    expire: addDays(now, 30)
  }

  const accessToken = jwt.sign(accessTokenData, config.get('AUTH.ACCESS_TOKEN_KEY'))

  const refreshToken = jwt.sign(refreshTokenData, config.get('AUTH.REFRESH_TOKEN_KEY'))

  addRefreshToken.values = [refreshToken, session.id]
  getSessionId.values = [refreshToken]

  await database.oneOrNone(addRefreshToken)

  await redis.set(`access_token_${accessToken}`, JSON.stringify(accessTokenData))

  const sessionId = await database.oneOrNone(getSessionId)

  if (!sessionId) {
    return null
  }

  return { accessToken, refreshToken }

}

export { getTokensService }
