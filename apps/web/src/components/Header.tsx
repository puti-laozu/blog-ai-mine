'use client'

import Link from 'next/link'
import { Search } from './Search'
import { useAuth } from '@/hooks/useAuth'

export function Header() {
  const { user, signIn, signOut } = useAuth()

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Blog
        </Link>
        
        <div className="w-1/3">
          <Search />
        </div>
        
        <nav className="flex items-center gap-4">
          <Link href="/archive">Archive</Link>
          <Link href="/tags">Tags</Link>
          {user ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <button onClick={signOut}>Sign Out</button>
            </>
          ) : (
            <button onClick={signIn}>Sign In</button>
          )}
        </nav>
      </div>
    </header>
  )
} 