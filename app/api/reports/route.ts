// app/api/reports/route.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handler for GET requests
export async function GET() {
  try {
    const reports = await prisma.report.findMany(); // Assurez-vous que `report` est le bon modèle
    return new Response(JSON.stringify(reports), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  } finally {
    await prisma.$disconnect();
  }
}
