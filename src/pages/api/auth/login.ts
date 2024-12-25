import { NextApiRequest, NextApiResponse } from 'next';
import { generateToken } from '../../../lib/auth';
import { hash, compare } from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { username, password } = req.body;

    // 在实际应用中，这里应该从数据库查询用户
    const validUsername = process.env.ADMIN_USERNAME;
    const validPassword = process.env.ADMIN_PASSWORD;

    if (username !== validUsername) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await compare(password, validPassword);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = await generateToken({ username });
    return res.status(200).json({ token });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
} 