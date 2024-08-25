import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import dynamic from 'next/dynamic';
import Main from "@/components/Main";
import { cn } from "@/lib/utils";
import MiniKitProvider from '@/lib/providers/minikit-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Argiefy Club',
  description: 'World ID for Argiefy Club - Aleph Hackathon',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const MinikitProvider = dynamic(
    () => import('@/lib/providers/minikit-provider'),
    { ssr: false }
  );

  return (
    <html lang="en" className="notranslate dark">
      <body
        className={cn(`h-svh bg-background antialiased`)}
        suppressHydrationWarning
      >
        <MiniKitProvider>
          <div className="sticky top-0 z-50 flex w-full items-center justify-between bg-muted p-2 pl-4 h-14">
            <p className={"text-lg font-semibold"}>Argiefy Club</p>
          </div>

          <Main>{children}</Main>
        </MiniKitProvider>
      </body>
    </html>
  );
}
