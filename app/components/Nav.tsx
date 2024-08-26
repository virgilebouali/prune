"use client"

import React, { useEffect, useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "../../@/components/ui/dropdown-menu"
import { ModeToggle } from './dark-mode-toggle'
import { User, UserIcon, TrainFront, MenuIcon } from 'lucide-react'
import { Searchbar } from './searchbar'
import { Button } from '@/src/@/components/ui/button'
import { jwtDecode } from "jwt-decode";
import ModalCard from './create-modal';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const Nav = () => {
  const [username, setUsername] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter()

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded);
        setUsername(decoded.username);
        console.log(username)
        // Assurez-vous que "username" est bien présent dans le token JWT
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }
  }, []);

  return (
    <header className="w-full border-b-2">
        <nav className="flex h-16 items-center justify-evenly max-w-screen">
            <div className="flex">
        <Link href="/"><h1 className="text-4xl font-bold"><span className="text-purple-500">Prune</span></h1></Link>
        </div>

        <div>
      <button onClick={openModal} className="btn btn-primary border-b-2 p-2 border-purple-200">
        Créer
      </button>

      <ModalCard isOpen={isModalOpen} onClose={closeModal} />
    </div>

<DropdownMenu>
          <DropdownMenuTrigger className="border-2 rounded-full p-2">
            <UserIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-4 py-4 mt-4 cursor-pointer bg-black text-lg">
            {username ? (
              <>
                <DropdownMenuItem className="text-lg text-purple-500">Bonjour, {username}</DropdownMenuItem>
                <DropdownMenuItem className="text-lg text-red-500" onClick={() => {
                  localStorage.removeItem('token');
                  toast.success('Vous avez été déconnecté');
                  setTimeout(() => {
                    router.push('/');
                  }, 2000); 

                  setUsername(null);
                }}>
                  Déconnexion
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem className="text-lg">
                  <Link href="/register">Inscription</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-lg">
                  <Link href="/login">Connexion</Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

<ModeToggle />
</nav>

    </header>
  )
}

export default Nav