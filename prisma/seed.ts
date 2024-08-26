import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Liste des arrêts de la ligne 1 du métro de Paris
  const stationsLigne1 = [
    { name: 'La Défense', ligne: 1 },
    { name: 'Esplanade de La Défense', ligne: 1 },
    { name: 'Pont de Neuilly', ligne: 1 },
    { name: 'Les Sablons', ligne: 1 },
    { name: 'Porte Maillot', ligne: 1 },
    { name: 'Argentine', ligne: 1 },
    { name: 'Charles de Gaulle – Étoile', ligne: 1 },
    { name: 'George V', ligne: 1 },
    { name: 'Franklin D. Roosevelt', ligne: 1 },
    { name: 'Champs-Élysées – Clemenceau', ligne: 1 },
    { name: 'Concorde', ligne: 1 },
    { name: 'Tuileries', ligne: 1 },
    { name: 'Palais Royal – Musée du Louvre', ligne: 1 },
    { name: 'Louvre – Rivoli', ligne: 1 },
    { name: 'Châtelet', ligne: 1 },
    { name: 'Hôtel de Ville', ligne: 1 },
    { name: 'Saint-Paul', ligne: 1 },
    { name: 'Bastille', ligne: 1 },
    { name: 'Gare de Lyon', ligne: 1 },
    { name: 'Reuilly – Diderot', ligne: 1 },
    { name: 'Nation', ligne: 1 },
    { name: 'Porte de Vincennes', ligne: 1 },
    { name: 'Saint-Mandé', ligne: 1 },
    { name: 'Bérault', ligne: 1 },
    { name: 'Château de Vincennes', ligne: 1 }
  ];

  // Insertion des stations dans la base de données
  await prisma.station.createMany({
    data: stationsLigne1,
  });

  console.log('Stations de la ligne 1 insérées avec succès');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
