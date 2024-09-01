"use client";

import React, { useState } from 'react';
import Nav from '../components/Nav';
import { toast } from "sonner";
import { Input } from '@/src/@/components/ui/input';
import { Button } from '@/src/@/components/ui/button';
import { useRouter } from 'next/navigation';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json(); // Supposons que l'API renvoie un jeton ou des informations utilisateur
        localStorage.setItem('authToken', data.token); // Stocke le jeton dans le stockage local
        
        toast.success("Inscription réussie! Vous êtes maintenant connecté.");
        setUsername('');
        setPassword('');
        
        // Rediriger vers une page protégée ou d'accueil
        router.push('/');  // Remplacez '/dashboard' par la page que vous souhaitez

      } else {
        const errorText = await res.text();
        setError(errorText);
        toast.error(errorText);  // Affiche une erreur avec toast
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <section className="h-screen">
        <h2 className="text-3xl font-bold tracking-tight ml-10 mt-24">Inscription 👋</h2>
        <div className="mt-12 gap-y-2">
          <form onSubmit={handleSubmit} className="flex flex-col items-start ml-10">
            <Input
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              required
              value={username}
              type="text"
              placeholder="Nom d'utilisateur"
              className="h-12 w-56 border-gray-800 p-2 items-center justify-center text-center"
            />
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Mot de passe"
              className="h-12 w-56 mt-4 border-gray-800 p-2 items-center justify-center text-center"
            />
            <Button
              type="submit"
              variant="outline"
              className="bg-purple-500 mt-4 border-gray-800 hover:font-bold"
            >
              S&apos;inscrire
            </Button>
          </form>
          {error && <p className="ml-10 mt-4 text-red-600">{error}</p>}
        </div>
      </section>
    </>
  );
};

export default Register;
