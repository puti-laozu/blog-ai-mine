import { NextResponse } from 'next/server';
import { z } from 'zod';

const commentSchema = z.object({
  postId: z.number(),
  content: z.string().min(1),
  author: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const body = commentSchema.parse(json);

    // 这里将通过 Worker API 保存评论
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to post comment');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
} 