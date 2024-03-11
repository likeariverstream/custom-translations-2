import { createHmac } from 'node:crypto'
import config from 'config'

const sha256 = (string) => {
  const passwordKey = config.get('AUTH.PASSWORD_KEY')
  const hash = createHmac('sha256', `${passwordKey}`)
    .update(string)
    .digest('hex')

  return hash

}

export { sha256 }
