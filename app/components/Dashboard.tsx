"use client"

import { Table } from '@/src/@/components/ui/table'
import { TableDemo } from './table'
import { ComboboxDemo } from './stationlist'
import { Vegan, VeganIcon, Zap } from 'lucide-react'
import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";




const Dashboard = () => {

  const [username, setUsername] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("test:" + decoded);
        setUsername(decoded.username);
        console.log(username)
        // Assurez-vous que "username" est bien présent dans le token JWT
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }
  }, [username]);


  return ( 
    <section className="py-4 max-w-screen">
    <h2 className="text-3xl font-bold tracking-tight ml-8 items-center flex"><Zap className="text-purple-500 text-2xl mr-4"/>Les dernières prunes </h2>
    <p className="mx-12 justify-center mt-4">Vous pouvez créer une prune ou signaler l&apos;absence au bout de <span className="text-purple-500">3 signalements</span> la prune est <span className="">supprimée</span>.</p>

    <div className="py-4 mx-4 border-2 rounded mt-12">
     <ComboboxDemo />
    <TableDemo/>
    </div>
    </section>
  )
}

export default Dashboard