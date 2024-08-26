"use client";

import React, { useState } from 'react';
import Nav from '../components/Nav';
import { Input } from '@/src/@/components/ui/input';
import { Button } from '@/src/@/components/ui/button';
import { toast } from "sonner"
import { useRouter } from 'next/navigation'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessage('Connexion réussie!')
        toast.success("Connexion réussie!")
        router.push('/')
; // or "Connexion réus sie!"
        // Optionally, save the token to localStorage or handle it as needed
        localStorage.setItem('token', data.token);
        navigate
        setUsername('');
        setPassword('');
      } else {
        const errorText = await res.text();
        setError(errorText);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <section className="justify-center items-center">
      <Nav />
      <h2 className="text-3xl font-bold tracking-tight ml-10 mt-24">Connexion</h2>
      <div className="items-center mt-12 gap-y-2 justify-center">
        <form onSubmit={handleSubmit}>
          <Input 
            id="username"
            type="text"
            placeholder="Nom d'utilisateur"
            className="h-12 w-56 ml-10 border-gray-800 p-2"
            onChange={(e) => setUsername(e.target.value)}
            required
            value={username}
          />
          <Input
            type="password"
            id="password"
            placeholder="Mot de passe"
            className="h-12 w-56 ml-10 mt-4 border-gray-800 p-2"
            onChange={(e) => setPassword(e.target.value)}
            required
            value={password}
          />
          <Button
            variant="outline"
            className="p-2 ml-10 mt-4  bg-purple-500 hover:font-bold"
            type="submit"
          >
            Connexion
          </Button>
        </form>
        {message && <p className="text-green-500 ml-10 mt-4">{message}</p>}
        {error && <p className="text-red-500 ml-10 mt-4">{error}</p>}
      </div>
    </section>
  );
};

export default Login;
