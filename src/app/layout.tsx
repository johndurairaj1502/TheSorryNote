import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Caveat, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-caveat',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'A Little Message for You ♡',
  description: 'An adorable kawaii romantic apology and cute love note from Kabi ♡',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2285%22>🎀</text></svg>',
  },
};

export const viewport: Viewport = {
  themeColor: '#FFEBF1',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${caveat.variable} ${cormorant.variable}`}
    >
      <body className="min-h-screen bg-[#FFF2F6] text-kawaii-choco-800 font-sans antialiased overflow-x-hidden selection:bg-kawaii-pink-300 selection:text-kawaii-choco-900">
        {children}
      </body>
    </html>
  );
}
