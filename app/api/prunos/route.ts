import { NextResponse } from 'next/server';
import { toast } from 'sonner';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, station, ligne, token } = body;

    if (!token) {
      return NextResponse.json({ error: 'Token missing' }, { status: 401 });
    }

    // Vérification du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const userId = decoded.id;

    
    const newPruno = await prisma.pruno.create({
      data: {
        title,
        content,
        station,
        ligne,
        published: false, // Default value
        published_date: new Date(),
        authorId: userId,
      },
    });

    return NextResponse.json({ pruno: newPruno }, { status: 201 });
  } catch (error) {
    console.error('Error creating Pruno:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
