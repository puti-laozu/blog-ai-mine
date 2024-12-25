import { sign } from '@tsndr/cloudflare-worker-jwt';

export async function handleLogin(request: Request, env: Env) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { username, password } = await request.json();

    // 验证用户名密码
    if (username !== env.ADMIN_USERNAME || password !== env.ADMIN_PASSWORD) {
      return new Response('Invalid credentials', { status: 401 });
    }

    // 生成 JWT token
    const token = await sign(
      { username, exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) },
      env.JWT_SECRET
    );

    return Response.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 