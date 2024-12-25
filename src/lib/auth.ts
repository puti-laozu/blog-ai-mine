import { NextApiRequest } from 'next';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function verifyToken(req: NextApiRequest) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  try {
    return verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export async function generateToken(payload: any) {
  return new Promise((resolve, reject) => {
    sign(payload, JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
      if (err) reject(err);
      else resolve(token);
    });
  });
} 