import { Hono } from 'hono'
import { sign } from '@tsndr/cloudflare-worker-jwt'
import { drizzle } from 'drizzle-orm/d1'
import { users } from '@blog/db'
import { nanoid } from 'nanoid'
import { getConfig } from '../config'

const router = new Hono()

router.get('/github', async (c) => {
  const config = getConfig(c.env)
  const url = new URL('https://github.com/login/oauth/authorize')
  url.searchParams.set('client_id', config.GITHUB_CLIENT_ID)
  url.searchParams.set('redirect_uri', `${config.FRONTEND_URL}/api/auth/callback`)
  return c.redirect(url.toString())
})

router.get('/callback', async (c) => {
  const { code } = c.req.query()
  const config = getConfig(c.env)
  
  // Exchange code for access token
  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: config.GITHUB_CLIENT_ID,
      client_secret: config.GITHUB_CLIENT_SECRET,
      code,
    }),
  })
  
  const { access_token } = await tokenRes.json()
  
  // Get user data
  const userRes = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
  
  const userData = await userRes.json()
  
  // Create or update user
  const db = drizzle(c.env.DB)
  const user = await db.insert(users)
    .values({
      id: nanoid(),
      name: userData.name || userData.login,
      email: userData.email,
      avatar: userData.avatar_url,
      githubId: userData.id.toString(),
    })
    .onConflictDoUpdate({
      target: users.githubId,
      set: {
        name: userData.name || userData.login,
        email: userData.email,
        avatar: userData.avatar_url,
      },
    })
    .returning()
    .get()
  
  // Create JWT
  const token = await sign(
    { sub: user.id, name: user.name },
    config.JWT_SECRET
  )
  
  // Set cookie and redirect
  c.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
    path: '/',
  })
  
  return c.redirect('/')
})

router.post('/logout', (c) => {
  c.cookie('token', '', { maxAge: 0 })
  return c.json({ success: true })
})

export { router as authRouter } 