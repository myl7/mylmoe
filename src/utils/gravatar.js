import crypto from 'crypto'

/**
 * @param {string} email
 */
const gravatar = email => {
  const hash = crypto.createHash('md5').update(email.trim().toLowerCase()).digest('hex')
  return `https://www.gravatar.com/avatar/${hash}&d=retro`
}

export default gravatar
