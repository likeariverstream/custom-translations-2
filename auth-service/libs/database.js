import pgPromise from 'pg-promise'
import config from 'config'

const initOptions = {}

const pgp = pgPromise(initOptions)

const connection = {
  host: `${config.get('DATABASE.HOST')}`,
  port: Number(config.get('DATABASE.PORT')),
  database: `${config.get('DATABASE.NAME')}`,
  user: `${config.get('DATABASE.USER')}`,
  password: `${config.get('DATABASE.PASSWORD')}`,
  max: Number(config.get('DATABASE.MAX'))
}

const database = pgp(connection)

export { database }
