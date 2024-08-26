// app/api/protected/route.ts
import { NextResponse } from 'next/server';
import { verifyToken } from '../../middleware/verifyToken';

export async function GET(request: Request) {
  const verifiedUser = await verifyToken(request);
  
  if (!verifiedUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Si le token est valide, continuer avec le traitement de la requête
  return NextResponse.json({ message: 'This is a protected route', user: verifiedUser });
}
