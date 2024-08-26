import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "@/src/@/components/ui/sonner";

const inter = Poppins({
  weight: '400',
  subsets: ['latin'],
});

interface LayoutProps {
  children: React.ReactNode;
  create?: React.ReactNode; // Optional prop
}

export const metadata: Metadata = {
  title: "Prune",
  description: "Signalez les prunes en toute simplicité",
};

export default function RootLayout({ children, create }: LayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          {create}
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
