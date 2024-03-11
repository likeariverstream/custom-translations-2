import { redis } from '~libs/redis.js'

const getSessionByTokenService = async (accessToken) => {
  const session = await redis.get(`access_token_${accessToken}`)

  if (!session) {
    return null
  }

  return JSON.parse(session)
}

export { getSessionByTokenService }
