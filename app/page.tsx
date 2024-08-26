"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


import Nav from "./components/Nav";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
export default function Home() {

  const router = useRouter();
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      router.push('/intro ');
    }
  }, [router]);
  return (
    <main className="max-w-screen max-h-screen">
    <Nav/>  
    <section className="mt-16">
    <Dashboard />
    </section>
    <Footer/>
    </main>
  );
}
