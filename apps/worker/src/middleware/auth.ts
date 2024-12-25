import { MiddlewareHandler } from 'hono'
import { verify } from '@tsndr/cloudflare-worker-jwt'
import { getConfig } from '../config'

export const auth = (): MiddlewareHandler => {
  return async (c, next) => {
    const authHeader = c.req.header('Authorization')
    
    if (!authHeader?.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized' }, 401)
    }

    const token = authHeader.split(' ')[1]
    const config = getConfig(c.env)

    try {
      const isValid = await verify(token, config.JWT_SECRET)
      if (!isValid) throw new Error('Invalid token')

      const payload = JSON.parse(atob(token.split('.')[1]))
      c.set('user', payload)
      
      await next()
    } catch {
      return c.json({ error: 'Unauthorized' }, 401)
    }
  }
} 