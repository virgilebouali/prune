import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Fonction d'assistance pour vérifier si le prune a suffisamment de signalements
const hasEnoughReports = async (pruneId: number): Promise<boolean> => {
  // Compter le nombre de signalements pour l'ID prune donné
  const reportCount = await prisma.report.count({
    where: { pruneId },
  });

  // Vérifier si le nombre est d'au moins 3
  return reportCount >= 3;
};

// Gestionnaire de requête DELETE
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const pruneId = parseInt(params.id, 10);

  // Extraire le token des en-têtes de la requête
  const token = request.headers.get('Authorization')?.split(' ')[1];
  if (!token) {
    return NextResponse.json({ error: 'Token manquant' }, { status: 401 });
  }

  // Vérifier la validité du token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    return NextResponse.json({ error: 'Token invalide' }, { status: 401 });
  }


  try {
    // Vérifier si le prune a suffisamment de signalements
    if (await hasEnoughReports(pruneId)) {
      // Supprimer l'enregistrement prune
      await prisma.pruno.delete({
        where: { id: pruneId },
      });
      return NextResponse.json({ message: 'Prune supprimé avec succès' });
    } else {
      return NextResponse.json({ message: 'Le prune ne peut pas être supprimé. Pas assez de signalements.' }, { status: 403 });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression du prune:', error as Error); // Log l'erreur pour le débogage
    return NextResponse.json({ message: (error as Error).message || 'Erreur lors de la suppression du prune' }, { status: 500 });
  }
}
