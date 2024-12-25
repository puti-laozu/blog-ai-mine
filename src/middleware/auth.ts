import { verify } from '@tsndr/cloudflare-worker-jwt';

export async function verifyAuth(request: Request, env: Env) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  try {
    return await verify(token, env.JWT_SECRET);
  } catch {
    return null;
  }
} 