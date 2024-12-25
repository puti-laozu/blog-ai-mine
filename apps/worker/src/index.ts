import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { postsRouter } from './routes/posts'
import { authRouter } from './routes/auth'
import { searchRouter } from './routes/search'
import { getConfig } from './config'

const app = new Hono()

// Middleware
app.use('/*', cors({
  origin: ['http://localhost:3000'],
  credentials: true,
}))

// Routes
app.route('/posts', postsRouter)
app.route('/auth', authRouter)
app.route('/search', searchRouter)

// Health check
app.get('/health', (c) => c.json({ status: 'ok' }))

export default app 