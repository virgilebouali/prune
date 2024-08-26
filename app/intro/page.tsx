"use client"
// pages/IntroPage.tsx
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/src/@/components/ui/button';
import { Cross } from 'lucide-react';
const IntroPage = () => {
  const router = useRouter();

  const handleStart = () => {
    localStorage.setItem('hasVisited', 'true');
    router.push('/register'); // Rediriger vers votre page principale
  };
  const handleLogin = () => {
    localStorage.setItem('hasVisited', 'true');
    router.push('/login'); // Rediriger vers votre page principale
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4   ">
      <h1 className="text-4xl font-bold mb-8">Bienvenue sur P<span className="text-purple-500">runo</span> </h1>
      <div className="flex-col items-center justify-center flex mx-4">
      <p  className="text-xl mb-6 ">
        Pruno est une plateforme de partage d'alertes en temps réel pour les voyageurs parisiens. </p>
        <p className="text-md mb-6 text-left"><Cross className="mb-4 text-purple-500"/>Créer des alertes signalant la présence de prunes</p> 
        <p> <Cross className="mb-4 text-purple-500"/>Signaler l'absence de prune à cet endroit (au bout de 3 signalements, la prune est supprimée). </p>
     <div className="flex-col flex"> <Button onClick={handleStart} className="bg-purple-500 mb-4 mt-12">
        Commencer
      </Button>
      <Button onClick={handleLogin} className="bg-white-500">
        Déjà inscrit ? 
      </Button>
      </div>
      </div>
    </div>
  );
};

export default IntroPage;
