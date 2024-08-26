import React from 'react'
import Link from 'next/link'
const Footer = () => {
  return (
        <footer className="bottom-0 border-t-2 flex-col p-4">
          <p  className="text-center"><Link href="">Signaler un bug</Link></p>
          <p  className="text-center"><Link href="">Contact</Link></p>    
             <p className="text-center">© 2024 <span className="text-purple-500">Prune</span></p>
     </footer>

  )
}

export default Footer