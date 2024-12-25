'use client'

import { useQuery } from '@tanstack/react-query'
import { useState, useCallback } from 'react'
import { debounce } from 'lodash'
import { Post } from '@/types'

export function Search() {
  const [query, setQuery] = useState('')

  const { data: results } = useQuery<Post[]>({
    queryKey: ['search', query],
    queryFn: () => fetch(`/api/search?q=${query}`).then(res => res.json()),
    enabled: query.length > 2
  })

  const debouncedSearch = useCallback(
    debounce((value: string) => setQuery(value), 300),
    []
  )

  return (
    <div className="relative">
      <input
        type="search"
        onChange={(e) => debouncedSearch(e.target.value)}
        placeholder="Search posts..."
        className="w-full p-2 border rounded"
      />
      {results && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white border rounded shadow-lg">
          {results.map(post => (
            <a
              key={post.id}
              href={`/posts/${post.slug}`}
              className="block p-2 hover:bg-gray-100"
            >
              {post.title}
            </a>
          ))}
        </div>
      )}
    </div>
  )
} 