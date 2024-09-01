// app/layout.tsx
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";   

import { Toaster } from "@/src/@/components/ui/sonner";
import ModalCard from "./components/create-modal";

const inter = Poppins({
  weight: '400',
  subsets: ['latin'],
});


export const metadata: Metadata = {
  title: "Prune",
  description: "Signalez les prunes en toute simplicité",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange   

        >
          <main className="md:mx-56 mx-4">{children}</main>
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}