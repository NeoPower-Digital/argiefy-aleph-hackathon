import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import dynamic from 'next/dynamic';

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
    <html lang='en'>
      <body className={inter.className}>
        <MinikitProvider>{children}</MinikitProvider>
      </body>
    </html>
  );
}
