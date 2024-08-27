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
  create?: React.ReactNode; // ReactNode does not need to be invoked as a function
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

          {create /* Directly render the create prop if it's provided */}
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
