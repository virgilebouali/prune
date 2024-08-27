"use client"

import React from 'react'
import Nav from '../components/Nav'
import { useState } from 'react';
import { toast } from "sonner"

import { Input } from '@/src/@/components/ui/input'
import { Button } from '@/src/@/components/ui/button'
import { useRouter } from 'next/navigation';
const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter()

  const handleSubmit = async (event: { preventDefault: () => void; }) => {

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
        setMessage('');
        toast.success("Inscription réussie!")
        setUsername('');
        setPassword('');
        setTimeout(() => {
          router.push('/login');
        }, 2000); 
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
      <h2 className="text-3xl font-bold tracking-tight ml-10 mt-24">Inscription 👋</h2>
<div className="items-center mt-12 gap-y-2 justify-center">
  <form onSubmit={handleSubmit}>
 <Input  id="username"  onChange={(e) => setUsername(e.target.value)}
            required value={username}
 type="text" placeholder="  Nom d'utilisateur" className="h-12 w-56 ml-10 border-gray-800 p-2"/>

 <Input type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required  placeholder="  Mot de passe" className="h-12 w-56 ml-10 mt-4 border-gray-800 p-2"/>

 <Button variant="outline" className=" bg-purple-500 ml-10 mt-4 border-gray-800 hover:font-bold">S&apos;inscrire</Button>
 </form>
 </div>

    </section>
  )
}

export default Register