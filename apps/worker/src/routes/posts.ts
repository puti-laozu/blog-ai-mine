import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { DrizzleD1Database, drizzle } from 'drizzle-orm/d1'
import { posts, comments } from '@blog/db'
import { nanoid } from 'nanoid'
import { auth } from '../middleware/auth'

const router = new Hono()

const createPostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  excerpt: z.string().optional(),
  published: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
})

router.post('/', auth(), zValidator('json', createPostSchema), async (c) => {
  const data = c.req.valid('json')
  const user = c.get('user')
  const db = drizzle(c.env.DB)

  const post = await db.insert(posts).values({
    id: nanoid(),
    title: data.title,
    content: data.content,
    excerpt: data.excerpt,
    published: data.published,
    authorId: user.id,
    slug: slugify(data.title),
  }).returning().get()

  return c.json(post)
})

router.get('/', async (c) => {
  const db = drizzle(c.env.DB)
  const allPosts = await db.select().from(posts)
  return c.json(allPosts)
})

export { router as postsRouter } 