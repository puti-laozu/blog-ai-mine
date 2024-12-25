import { create } from 'zustand'
import { User } from '@/types'

interface AuthState {
  user: User | null
  isLoading: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  
  signIn: async () => {
    // 重定向到 GitHub OAuth
    window.location.href = '/api/auth/github'
  },
  
  signOut: async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    set({ user: null })
  },
})) 