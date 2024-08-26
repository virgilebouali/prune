import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';
export async function POST(req: Request, { params }: { params: { id: string } }) {
  const pruneId = parseInt(params.id);

  try {
    // Increment the reportCount field for the specified Pruno
    const updatedPruno = await prisma.pruno.update({
      where: { id: pruneId },
      data: {
        reportCount: {
          increment: 1,
        },
      },
    });

    // Check if the reportCount has reached the threshold for deletion
    if (updatedPruno.reportCount >= 3) {
      await prisma.pruno.delete({
        where: { id: pruneId },
      });

      return NextResponse.json({ message: 'Prune deleted after 3 reports' });
    }

    return NextResponse.json({ message: 'Report added successfully' });
  } catch (error) {
    console.error('Error reporting pruno:', error);
    return NextResponse.json({ message: 'Error reporting pruno' }, { status: 500 });
  }
}