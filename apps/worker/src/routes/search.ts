import { Hono } from 'hono'
import { drizzle } from 'drizzle-orm/d1'
import { posts } from '@blog/db'
import { sql } from 'drizzle-orm'

const router = new Hono()

router.get('/', async (c) => {
  const { q } = c.req.query()
  const db = drizzle(c.env.DB)

  if (!q) {
    return c.json([])
  }

  const results = await db.select()
    .from(posts)
    .where(sql`title LIKE ${`%${q}%`} OR content LIKE ${`%${q}%`}`)
    .limit(10)

  return c.json(results)
})

export { router as searchRouter } 