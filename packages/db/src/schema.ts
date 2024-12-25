import { sql } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const posts = sqliteTable('posts', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  slug: text('slug').notNull().unique(),
  excerpt: text('excerpt'),
  published: integer('published', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
  authorId: text('author_id').notNull(),
  views: integer('views').notNull().default(0),
})

export const tags = sqliteTable('tags', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
})

export const postsTags = sqliteTable('posts_tags', {
  postId: text('post_id').notNull().references(() => posts.id),
  tagId: text('tag_id').notNull().references(() => tags.id),
})

export const comments = sqliteTable('comments', {
  id: text('id').primaryKey(),
  content: text('content').notNull(),
  postId: text('post_id').notNull().references(() => posts.id),
  authorId: text('author_id').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
})

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  avatar: text('avatar'),
  githubId: text('github_id').unique(),
}) 