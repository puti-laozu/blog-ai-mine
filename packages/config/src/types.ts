export interface Post {
  id: string
  title: string
  content: string
  slug: string
  excerpt?: string
  published: boolean
  createdAt: string
  updatedAt: string
  authorId: string
  views: number
  tags?: Tag[]
}

export interface Tag {
  id: string
  name: string
  slug: string
}

export interface Comment {
  id: string
  content: string
  postId: string
  authorId: string
  createdAt: string
  author?: User
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  githubId?: string
} 