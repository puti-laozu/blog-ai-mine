import { Env } from '../types/index';

export async function verifyAuth(request: Request, env: Env) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  try {
    return true;
  } catch {
    return null;
  }
} 