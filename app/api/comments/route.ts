import { NextResponse } from 'next/server';
import { z } from 'zod';

const commentSchema = z.object({
  content: z.string().min(1).max(500),
  author: z.string().min(1).max(50),
  postId: z.number().positive()
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = commentSchema.parse(body);

    // 这里将通过 Worker API 保存评论
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validatedData),
    });

    if (!response.ok) {
      throw new Error('Failed to post comment');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 