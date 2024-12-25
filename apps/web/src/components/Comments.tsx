'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Comment } from '@/types'

export function Comments({ postId }: { postId: string }) {
  const [content, setContent] = useState('')
  const queryClient = useQueryClient()

  const { data: comments } = useQuery<Comment[]>({
    queryKey: ['comments', postId],
    queryFn: () => fetch(`/api/posts/${postId}/comments`).then(res => res.json())
  })

  const mutation = useMutation({
    mutationFn: (newComment: { content: string }) =>
      fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify(newComment),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] })
      setContent('')
    },
  })

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold">Comments</h3>
      <div className="mt-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Write a comment..."
        />
        <button
          onClick={() => mutation.mutate({ content })}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </div>
      <div className="mt-6 space-y-4">
        {comments?.map(comment => (
          <div key={comment.id} className="p-4 bg-gray-50 rounded">
            <p>{comment.content}</p>
            <p className="text-sm text-gray-500 mt-2">
              {new Date(comment.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
} 