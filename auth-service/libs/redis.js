import Redis from 'ioredis'
import config from 'config'

const redis = new Redis({
  host: config.get('REDIS.HOST'),
  port: config.get('REDIS.PORT'),
  username: config.get('REDIS.USERNAME'),
  password: config.get('REDIS.PASSWORD'),
  db: config.get('REDIS.DB')
})

export { redis }
