// app/api/stations/route.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handler for GET requests
export async function GET() {
  try {
    const prunos = await prisma.pruno.findMany();
    return new Response(JSON.stringify(prunos), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching stations:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  } finally {
    await prisma.$disconnect();
  }
}

