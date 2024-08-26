import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


// Helper function to check if prune has enough reports
const hasEnoughReports = async (pruneId: number): Promise<boolean> => {
  // Count the number of reports for the given prune ID
  const reportCount = await prisma.report.count({
    where: { pruneId },
  });

  // Check if the count is at least 3
  return reportCount >= 3;
};

// DELETE request handler
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const pruneId = parseInt(params.id, 10);

  try {
    // Check if the prune has enough reports
    if (await hasEnoughReports(pruneId)) {
      // Delete the prune record
      await prisma.pruno.delete({
        where: { id: pruneId },
      });
      return NextResponse.json({ message: 'Prune deleted successfully' });
    } else {
      return NextResponse.json({ message: 'Prune cannot be deleted. Not enough reports.' }, { status: 403 });
    }
  } catch (error) {
    console.error('Error deleting prune:', error); // Log the error for debugging
    return NextResponse.json({ message: error.message || 'Error deleting prune' }, { status: 500 });
  }
}
