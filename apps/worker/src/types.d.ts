interface Env {
  DB: D1Database
  CACHE: KVNamespace
  GITHUB_CLIENT_ID: string
  GITHUB_CLIENT_SECRET: string
  JWT_SECRET: string
  FRONTEND_URL: string
}

interface User {
  id: string
  name: string
}

declare module 'hono' {
  interface ContextVariableMap {
    user: User
  }
} 