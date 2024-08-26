// middleware/verifyToken.ts
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

export async function verifyToken(request) {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded)
    // Token is valid, return the decoded user info (optional)
    return decoded;
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
  }
}
